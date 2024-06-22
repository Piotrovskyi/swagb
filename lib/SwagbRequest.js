class SwagbRequest {
  required() {
    this._required = false;
    this._contentType = null
    this._content = null;
    return this;
  }

  json(json) {
    this._contentType = 'application/json';
    this._content = json;
    return this;
  }

  xml(xml) {
    this._contentType = 'application/xml';
    this._content = xml;
    return this;
  }

  content(contentType, content) {
    this._contentType = contentType;
    this._content = content;
    return this;
  }

  compile() {
    return {
      required: this._required,
      content: {
        [this._contentType]: {
          schema: this._content,
        },
      },
    };
  }
}

module.exports = SwagbRequest;
