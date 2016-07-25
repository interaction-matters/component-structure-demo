const allowedTags = {
  'lb': 'br',
  'head': 'h4',
  'title': 'h4',
  'list': 'ul',
  'item': 'li',
  'hi': 'strong',
  'row': 'tr',
  'cell': 'td',
  'ref': 'em',
  'figure': 'span',
  'graphic': 'img'
};

const getAttributes = (attributes, markersByColor) => {
  let prop;
  let res = '';
  let colorObj;
  for (prop in attributes) {
    if (attributes.hasOwnProperty(prop)) {
      res += `${prop}="${attributes[prop]}" `;
      if (prop === 'xml:id') {
        res += `id="${attributes[prop]}" `;
      }
      if (markersByColor[attributes[prop]]) {
        colorObj = markersByColor[attributes[prop]];
        res += `style="background-color:${colorObj.bgcolor};color:${colorObj.color};"`;
      }
    }
  }
  return res;
};

// Creates HTML tag element by given props
export function element (props) {
  const {
    type,
    attributes,
    content,
    markersByColor,
    pathPrefix
  } = props;

  if (type === '__text__') {
    return content;
  }

  if (type === 'graphic') {
    attributes.src = pathPrefix + attributes.url;
    delete attributes.url;
  }

  const tagName = allowedTags[type] || type;

  return `<${tagName} ${getAttributes(attributes, markersByColor)}>${content}</${tagName}>`;
}

// Parses FullText JSON object and creates HTML
export function parseFullText (node, markersByColor, pathPrefix) {
  if (!node) {
    return '';
  }

  let content = '';
  if (Array.isArray(node.content)) {
    node.content.forEach(subnode => {
      let res = parseFullText(subnode, markersByColor, pathPrefix);
      if (res) {
        content += res;
      }
      content += '';
    });
  } else if (node.content) {
    content = node.content;
  }
  return element({
    type: node.name,
    attributes: node.atts,
    content,
    markersByColor,
    pathPrefix
  });
}

// Create highlighting markup for sidebar
export function getMarkupForHighlights (js, markersByColor) {
  const sidebar = parseJsonForHighlights(js, markersByColor);
  return `<div class="hlTable">${sidebar}</div>`;
}

// Create highlighting markup for sidebar
export function parseJsonForHighlights (js, markersByColor, level = 0) {
  if (!Array.isArray(js.content)) {
    return js.content;
  }

  let retval = '';
  level += 1;

  js.content.forEach(function (el) {
    let id = '';
    if (el.atts) {
      id = el.atts['xml:id'] || el.atts['id'] || '';
    }

    let res = parseJsonForHighlights(el, markersByColor, level);
    if (!res) {
      return;
    }

    if (el.name === 'span' && el.atts && el.atts.class && /^m[A-Z]$/.test(el.atts.class)) {
      retval += `<hlCell class="${el.atts.class}">${res}</hlCell>`;
    } else if (level === 1) {
      if (res.indexOf('</hlCell>') === -1) {
        res = '';
      } else {
        let rx, colorObj;
        res = Object.keys(markersByColor).map(marker => {
          rx = new RegExp('class="' + marker + '"');
          colorObj = markersByColor[marker];
          if (rx.test(res)) {
            return `<a class="hlCell" href="#${id}" style="background-color:${colorObj.bgcolor};color:${colorObj.color};"></a>`;
          } else {
            return `<a class="hlCell" href="#${id}"></a>`;
          }
        }).join('');
      }
      if (!res) {
        retval += `<a href="#${id}" class="hlRow">${res}</a>`;
      } else {
        retval += `<div class="hlRow">${res}</div>`;
      }
    } else {
      retval += res;
    }
  });

  return retval;
}
