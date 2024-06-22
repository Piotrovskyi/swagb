class SwagbPath {
  constructor(method) {
    this._method = method;
    this._path = '';
    this._summary = '';
    this._description = '';
    this._tags = [];
    this._security = [];
    this._request = {};
    this._responses = {};
  }

  summary(summary) {
    this._summary = summary;
    return this;
  }

  description(description) {
    this._description = description;
    return this;
  }

  tags(tags) {
    this._tags = tags;
    return this;
  }

  security(security) {
    this._security = security;
    return this;
  }

  request(request) {
    this._request = request;
    return this;
  }

  responses(responses) {
    this._responses = responses;
    return this;
  }

  _compileRequest(request) {
    return request.compile();
  }

  _compileResponses(responses) {
    const compiledResponses = {};
    for (const [status, response] of Object.entries(responses)) {
      compiledResponses[status] = response.compile();
    }
    return compiledResponses;
  }

  compile() {
    return {
      [this._method]: {
        summary: this._summary,
        description: this._description,
        tags: this._tags,
        security: this._security,
        requestBody: this._compileRequest(this._request),
        responses: this._compileResponses(this._responses),
      },
    };
  }
}

module.exports = SwagbPath;
