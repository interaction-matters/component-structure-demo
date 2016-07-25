import {
  skeleton,
  parsePriorityNumber,
  parseApplicationNumber,
  parseAccessionNumbers,
  parsePublicationNumbers,
  parseTitles,
  parseAbstracts,
  parseInventors,
  parseApplicants,
  parseClasses
} from 'utils/biblio';

import {enrichBiblio} from 'utils/presto';

// Sorts dates in descending order
function sortDates (a, b) {
  return b.date.localeCompare(a.date);
}

export function parseApplicationMenuFromXml (viewer, xml, select) {
  // Only select changes that contain an idno element with url
  const items = select('//tei:listChange/tei:change[tei:idno[@type="url"]]', xml);
  if (items && items.length) {
    viewer.menu = {description: [], claims: []};
    items.forEach(item => {
      // Fetch ID
      let obj = {
        id: item.getAttribute('xml:id')
      };
      // Fetch type
      obj.type = select('tei:idno[@type="DocCode"]/text()|tei:idno[@type="Type"]/text()', item).toString().indexOf('D') === 0
        ? 'description'
        : 'claims';
      // Loop through child nodes
      Array.from(item.childNodes).forEach(kid => {
        // Fetch date
        if (kid.tagName === 'tei:date') {
          obj.date = kid.textContent;
        }
        // Fetch language
        if (kid.tagName === 'tei:lang') {
          obj.lang = kid.getAttribute('xml:lang');
        }
        // Fetch link and facsimile reference
        if (kid.tagName === 'tei:idno') {
          let type = kid.getAttribute('type');
          if (type === 'url') {
            obj.link = kid.textContent;
          } else if (type === 'facsimile-ref' && kid.textContent !== '') {
            obj.faxref = kid.textContent;
          }
        }
      });
      viewer.menu[obj.type].push(obj);
    });
    // Sort dates in descending order
    viewer.menu.description.sort(sortDates);
    viewer.menu.claims.sort(sortDates);
  }
  return {...viewer};
}

export function parseApplicationDatesFromXml (viewer, xml, select) {
  // Select application and priority dates
  const dates = select('//tei:biblStruct/tei:monogr/tei:imprint/tei:date/text()', xml);
  if (dates && dates.length) {
    viewer.dates = {application: [], priority: []};
    // Split dates between application and priority date(s) based on ancestor element
    dates.forEach(node => {
      if (select('ancestor::tei:listBibl[@type="priority-claims"]', node).length) {
        viewer.dates.priority.push(node.toString());
      } else {
        viewer.dates.application.push(node.toString());
      }
    });
  }
  return {...viewer};
}

export function parseApplicationFiguresFromXml (viewer, xml, select, path) {
  // Select figures
  const figures = select('//tei:facsimile/tei:surface[@type="DRAW"]', xml);
  if (figures && figures.length) {
    viewer.figures = {graphics: []};
    // Split dates between application and priority date(s) based on ancestor element
    figures.forEach(node => {
      viewer.figures.change = node.getAttribute('change');
      viewer.figures.type = node.getAttribute('type');
      Array.from(select('tei:graphic/@url', node)).forEach(kid => {
        viewer.figures.graphics.push(path + kid.value);
      });
      viewer.figures.graphics.reverse();
    });
  }
  return {...viewer};
}

export function parseApplicationBiblioFromXml (viewer, xml, select) {
  let biblio = select('//tei:teiHeader[@type="publication"]', xml);
  if (biblio && biblio.length) {
    biblio = biblio[0];
    viewer.biblio = {};
    // Parse title(s)
    let title = select('./tei:fileDesc/tei:titleStmt/tei:title', biblio);
    if (title && title.length) {
      let bibTitles = [];
      Array.from(title).forEach(t => {
        let bibTitle = {
          title: t.textContent
        };
        // Copy attributes
        Array.from(t.attributes).forEach(att => {
          let name = att.nodeName === 'xml:lang' ? 'lang' : att.nodeName;
          bibTitle[name] = att.value;
        });
        bibTitles.push(bibTitle);
      });
      viewer.biblio.titles = bibTitles;
    }
    // Parse numbers
    let numbers = select('//tei:teiHeader[@type="application"]/tei:fileDesc/tei:sourceDesc', biblio);
    if (numbers && numbers.length) {
      numbers = numbers[0];
      // Application number
      let appNumber = select('./tei:biblStruct[@status="application" and @subtype="epodoc"]/tei:monogr/tei:idno[@type="docNumber"]/text()', numbers).toString();
      if (appNumber && appNumber.length) {
        viewer.biblio.applicationNumber = {type: 'epodoc', number: appNumber};
      } else {
        appNumber = select('./tei:biblStruct[@status="application" and @subtype="docdb"]/tei:monogr', numbers);
        if (appNumber && appNumber.length) {
          appNumber = appNumber[0];
          let org = select('./tei:authority/tei:orgName/text()', appNumber).toString();
          let docNr = select('./tei:idno[@type="docNumber"]/text()', appNumber).toString();
          let kindCode = select('./tei:imprint/tei:classCode[@scheme="kindCode"]/text()', appNumber).toString();
          viewer.biblio.applicationNumber = {type: 'docdb', number: `${org} ${docNr}${kindCode}`};
        }
      }
      // Dossier number
      let dossierNr = select('./tei:biblStruct[@status="application" and @subtype="dossier"]/tei:monogr', numbers);
      if (dossierNr && dossierNr.length) {
        dossierNr = dossierNr[0];
        let org = select('./tei:authority/tei:orgName/text()', dossierNr).toString();
        let docNr = select('./tei:idno[@type="docNumber"]/text()', dossierNr).toString();
        let kindCode = select('./tei:imprint/tei:classCode[@scheme="kindCode"]/text()', dossierNr).toString();
        viewer.biblio.dossierNumber = {type: 'dossier', number: `${org} ${docNr} ${kindCode}`};
      }
      // Application filing date
      let filingDate = select('./tei:biblStruct[@status="application" and @subtype="docdb"]/tei:monogr/tei:imprint/tei:date/text()', numbers).toString();
      if (!filingDate) {
        filingDate = select('./tei:biblStruct[@status="application" and @subtype="pct"]/tei:monogr/tei:imprint/tei:date/text()', numbers).toString();
      }
      viewer.biblio.filingDate = filingDate;
    }
    // Priority numbers
    let prionums = select('./tei:listBibl[@type="priority-claims"]/tei:biblStruct[@subtype="docdb"]/tei:monogr', biblio);
    if (prionums && prionums.length) {
      let bibPrioNums = [];
      Array.from(prionums).forEach(prionum => {
        let org = select('./tei:authority/tei:orgName/text()', prionum).toString();
        let num = select('./tei:idno[@type="docNumber"]/text()', prionum).toString();
        let kc = select('./tei:imprint/tei:classCode[@scheme="kindCode"]/text()', prionum).toString();
        let number = `${org} ${num} ${kc}`;
        let date = select('./tei:imprint/tei:date/text()', prionum).toString();
        bibPrioNums.push({number, date});
      });
      viewer.biblio.priorityNumbers = bibPrioNums;
    }
    // Inventors
    let inventors = select('./tei:list[@type="additional-bibliographic-information"]/tei:item[@type="parties"]/tei:listPerson[@type="inventors"]/tei:person[@type="docdb"]', biblio);
    if (inventors && inventors.length) {
      let bibInventors = [];
      Array.from(inventors).forEach(inventor => {
        let name = select('./tei:persName/text()', inventor).toString();
        let residence = select('./tei:residence/text()', inventor).toString();
        bibInventors.push({name, residence});
      });
      viewer.biblio.inventors = bibInventors;
    }
    // Applicants
    let applicants = select('./tei:list[@type="additional-bibliographic-information"]/tei:item[@type="parties"]/tei:list[@type="applicants"]/tei:item[@type="docdb"]', biblio);
    if (applicants && applicants.length) {
      let bibApplicants = [];
      Array.from(applicants).forEach(applicant => {
        let name = select('./tei:name/text()', applicant).toString();
        let country = select('./tei:residence/tei:country/text()', applicant).toString();
        bibApplicants.push({name, country});
      });
      viewer.biblio.applicants = bibApplicants;
    }
    // Classifications
    let classifications = select('./tei:profileDesc/tei:textClass/tei:classCode', biblio);
    if (classifications && classifications.length) {
      let classes = {};
      Array.from(classifications).forEach(classification => {
        let scheme = classification.getAttribute('scheme');
        if (scheme && scheme !== 'ipc') {
          if (!classes.hasOwnProperty(scheme)) {
            classes[scheme] = [];
          }
          let cls = select('./tei:term/text()', classification).toString();
          classes[scheme].push(cls);
        }
      });
      viewer.biblio.classifications = classes;
    }
  }
  return {...viewer};
}

export function parseApplicationDescriptionFromXml (xml, select) {
  return select('//div[@type="description"]|//div[@type="claims"]', xml);
}

export function parsePublicationMenuFromJson (viewer, json, rid) {
  const parser = (type) => {
    if (json.hasOwnProperty(type)) {
      return json[type].map(d => {
        let obj = {type: type, link: rid};
        // Fetch id
        if (d.hasOwnProperty('sectionId')) {
          obj.id = d['sectionId'];
        }
        // Fetch date
        if (d.hasOwnProperty('dateProduced') || d.hasOwnProperty('sectionDate')) {
          obj.date = d['dateProduced'] || d['sectionDate'];
        }
        // Fetch language
        if (d.hasOwnProperty('language')) {
          obj.lang = d['language'];
        }
        // Fetch facsimile reference
        if (d.hasOwnProperty('facsimileId')) {
          obj.faxref = d['facsimileId'];
          obj.faxPageBegin = d['facsimileFirstPageNumber'];
          obj.faxPageEnd = d['facsimileLastPageNumber'];
          obj.faxQuality = d['sectionQuality'] || '01';
        }
        return obj;
      });
    }
    return [];
  };
  // Sort dates in descending order
  viewer.menu = {};
  viewer.menu[rid] = {
    description: parser('description').sort(sortDates),
    claims: parser('claims').sort(sortDates)
  };
  return {...viewer};
}

export function parsePublicationDateFromJson (viewer, json, rid) {
  viewer.dates = {};
  viewer.dates[rid] = {
    publication: json.hasOwnProperty('date') ? [json.date] : []
  };
  return {...viewer};
}

export function parsePublicationFiguresFromJson (viewer, json, path, rid) {
  const parser = () => {
    if (json.hasOwnProperty('drawings') && json.drawings.length) {
      return json.drawings.map(d => {
        let obj = {};
        if (d.hasOwnProperty('facsimileId')) {
          obj.type = 'DRAW';
          obj.change = d['facsimileId'];
          obj.graphics = [];
          path = path.replace('%facsimileId', obj.change);
          for (let i = 0, first = d['facsimileFirstPageNumber'], last = d['facsimileLastPageNumber']; i <= (last - first); i++) {
            obj.graphics.push(`${path}/${first + i}?format=image/png`);
          }
        }
        return obj;
      })[0];
    }
    return {};
  };
  viewer.figures = {};
  viewer.figures[rid] = parser();
  return {...viewer};
}

export function parsePublicationBiblioFromJson (params) {
  const {language, publicationidshort, biblio} = params;
  if (!biblio) {
    return {};
  }

  let json = {...biblio};

  if (!json['allKindCodes']) {
    json = enrichBiblio(json);
  }
  if (!json) {
    return {};
  }
  let kc = (
    json.allKindCodes.length > 1 && publicationidshort
      ? json.allKindCodes.filter(function (c) {
        return publicationidshort.endsWith(c);
      })
      : json.allKindCodes
  );

  // Fetch correct kind code(s)
  if (kc.length === 1 && kc[0].indexOf('WPI') !== 0) {
    kc.push('WPI-' + kc[0]);
  }

  const results = skeleton();
  results.language = language;
  parsePriorityNumber(results.numbers.priority, json.priority);

  Object.keys(json).forEach((prop) => {
    let val = json[prop];
    // Parse accession number(s)
    if (prop === 'wpi_an') {
      parseAccessionNumbers(results.numbers.accessions, prop, val);
    }
    // Parse application number
    if (prop === 'appn') {
      parseApplicationNumber(results.numbers.application, prop, val, (json.hasOwnProperty('fd') ? json['fd'] : null));
    }
    // Parse publication number(s)
    if (prop === 'pn') {
      parsePublicationNumbers(results.numbers.publications, prop, val, (json.hasOwnProperty('pd') ? json['pd'] : null));
    }
    // Abstracts
    if (prop.indexOf('abs_') === 0 || prop.indexOf('wpi_abs_') === 0) {
      parseAbstracts(results.abstracts, prop, val);
    }
    // Parse title(s)
    if (prop.indexOf('ti_') === 0 || prop.indexOf('wpi_ti_') === 0) {
      parseTitles(results.titles, prop, val);
    }
    // Parse inventor(s)
    if (prop.indexOf('in') === 0) {
      parseInventors(results.inventors, prop, val);
    }
    // Parse applicant(s)
    if (prop.indexOf('pa') === 0) {
      parseApplicants(results.applicants, prop, val);
    }
    // Parse class(es)
    if (['cca', 'cci', 'cui', 'cua', 'cqi', 'cqa', 'cnoi', 'cnoa',
          'clc', 'clu', 'clq', 'cnol',
          'ipc', 'uc', 'fi', 'ft', 'kw', 'wpi_a', 'wpi_aw', 'wpi_cn', 'wpi_cpy', 'wpi_dc', 'wpi_iw',
          'wpi_ks', 'wpi_mc', 'wpi_pi', 'wpi_m0', 'wpi_m1', 'wpi_m2', 'wpi_m3', 'wpi_m4', 'wpi_m5', 'wpi_m6'].indexOf(prop) > -1) {
      parseClasses(results.classes, prop, val);
    }
  });

  return results;
}

// --------------------------
// XML/JSON/JS/HTML parsers
// --------------------------
export function reformatJsFromXmlToJs (js) {
  let retval = {};
  if (js.hasOwnProperty('$$')) {
    retval.content = js.$$.map(function (el) {
      return reformatJsFromXmlToJs(el);
    });
  } else if (js.hasOwnProperty('_')) {
    retval.content = js._;
  }
  if (js.hasOwnProperty('$')) {
    retval.atts = js.$;
  }
  retval.name = js['#name'];
  return retval;
};
