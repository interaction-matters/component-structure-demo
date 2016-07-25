export function skeleton () {
  return {
    numbers: {
      publications: [],
      application: [],
      accessions: [],
      priority: []
    },
    titles: {
      data: {},
      count: {
        EN: { total: 0 },
        DE: { total: 0 },
        FR: { total: 0 },
        WPI: { total: 0 },
        total: 0
      }
    },
    abstracts: {
      data: {},
      count: {
        EN: { total: 0 },
        DE: { total: 0 },
        FR: { total: 0 },
        WPI: { total: 0 },
        total: 0
      }
    },
    inventors: {
      data: [],
      count: {
        total: 0
      }
    },
    applicants: {
      data: [],
      count: {
        total: 0
      }
    },
    classes: {
      data: {
        CPC: [],
        IPC: [],
        UC: [],
        FI: [],
        FT: [],
        KW: [],
        WPI: []
      },
      count: {
        total: 0
      }
    },
    language: 'EN'
  };
};

const classesMap = {
  wpi_a: 'Multi punch card',
  wpi_aw: 'Additional words',
  wpi_cn: 'Compound numbers',
  wpi_cpy: 'Company codes',
  wpi_dc: 'Derwent classes',
  wpi_iw: 'Index words',
  wpi_ks: 'Key serial',
  wpi_mc: 'Manual codes',
  wpi_pi: 'Polymer index',
  wpi_m0: 'Chemical codes',
  wpi_m1: 'Chemical codes',
  wpi_m2: 'Chemical codes',
  wpi_m3: 'Chemical codes',
  wpi_m4: 'Chemical codes',
  wpi_m5: 'Chemical codes',
  wpi_m6: 'Chemical codes'
};

const classesTypes = {
  CCA: 'CPC',
  CCI: 'CPC',
  CUI: 'CPC',
  CUA: 'CPC',
  CQI: 'CPC',
  CQA: 'CPC',
  CNOI: 'CPC',
  CNOA: 'CPC',
  // Linked classifications
  CLC: 'CPC',
  CLU: 'CPC',
  CLQ: 'CPC',
  CNOL: 'CPC'
};

/* ABSTRACTS AND TITLES */
function parseAbstractsAndTitles (result, prop, val) {
  let lang = prop.substring(prop.lastIndexOf('_') + 1).toUpperCase();
  for (let p in val) {
    let isWPI = prop.indexOf('wpi_') === 0;
    let type = isWPI ? 'WPI' : lang;
    result.count[type].total++;
    result.count.total++;
    let el = {
      lang: lang,
      data: Array.isArray(val[p]) ? val[p][0] : val[p],
      kindCode: p,
      type: type,
      wpi: isWPI
    };
    if (!result.data.hasOwnProperty(type)) {
      result.data[type] = [];
    }
    result.data[type].push(el);
  }
  return result;
}

export function parseTitles (result, prop, val) {
  return parseAbstractsAndTitles(result, prop, val);
}

export function parseAbstracts (result, prop, val) {
  return parseAbstractsAndTitles(result, prop, val);
}

/* INVENTORS AND APPLICANTS */
function parseInventorsAndApplicants (result, prop, val) {
  for (let p in val) {
    result.count['total'] += val[p].length;
    var el = {
      'data': val[p].map(function (el) {
        return el.replace(/(.*?)(<span[^>]+>)([^<]*)(<\/span>)|.*/ig, function (str, i0, i1, i2, i3) {
          if (typeof i1 !== 'undefined' && i1.length) return i0.toLowerCase() + i1 + i2.toLowerCase() + i3;
          return str.toLowerCase();
        });
      }),
      'kindCode': p
    };
    result.data.push(el);
  }
  return result;
}

export function parseInventors (result, prop, val) {
  return parseInventorsAndApplicants(result, prop, val);
}

export function parseApplicants (result, prop, val) {
  return parseInventorsAndApplicants(result, prop, val);
}

/* NUMBERS */
function parseNumber (result, prop, val, date = null) {
  for (let p in val) {
    var el = {
      'number': val[p],
      'kindCode': p
    };
    if (date) {
      el.date = date;
    }
    result.push(el);
  }
  return result;
}

export function parseApplicationNumber (result, prop, val, date) {
  return parseNumber(result, prop, val, date);
}

export function parseAccessionNumbers (result, prop, val) {
  return parseNumber(result, prop, val);
}

export function parsePublicationNumbers (result, prop, val, dates) {
  let pubDates = !dates
    ? {}
    : Object.keys(dates).reduce((coll, kc) => {
      let date = dates[kc][0];
      if (kc.indexOf(',') > -1) {
        kc.split(',').forEach(k => { coll[k] = date; });
      } else {
        coll[kc] = date;
      }
      return coll;
    }, {});
  for (let p in val) {
    let el = {
      'number': Array.isArray(val[p]) ? val[p][0] : val[p],
      'date': pubDates[p] || '',
      'kindCode': p
    };
    result.push(el);
  }
  return result;
}

export function parsePriorityNumber (result, val) {
  if (val) {
    result.push({...val});
  }
  return result;
}

export function parseClasses (result, prop, val) {
  for (let p in val) {
    let isWPI = prop.indexOf('wpi_') === 0;
    let name = (isWPI ? prop.substring(4) : prop).toUpperCase();
    let title = (isWPI ? classesMap[prop] : '');
    let type = (isWPI ? 'WPI' : (classesTypes.hasOwnProperty(name) ? classesTypes[name] : name));
    if (!result.count.hasOwnProperty(type)) {
      result.count[type] = {
        'total': 0
      };
    }
    result.count[type].total += val[p].length;

    if (type === 'CPC' || type === 'WPI') {
      if (!result.count[type].hasOwnProperty(name)) {
        result.count[type][name] = {
          total: 0
        };
      }
      result.count[type][name].total += val[p].length;
    }
    result.count.total += val[p].length;

    let data = val[p];
    if (['PI', 'M0', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6'].indexOf(name) > -1) {
      data = data.map(function (c) {
        return c.replace(/\n/g, '<br>');
      });
    } else if (['CLC', 'CLU', 'CLQ', 'CNOL'].indexOf(name) > -1) {
      data = data[0].split(', ').filter(function (c, i) {
        return ['INV', 'ADD'].indexOf(c) < 0;
      });
    }
    let el = {
      data: data,
      kindCode: p,
      name: name,
      title: title,
      type: type,
      wpi: isWPI
    };
    result.data[type].push(el);
  }
  return result;
}
