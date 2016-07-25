/**
*
* Version 0.9.16 (16.02.2016)
* Changes:
*  - Added module.exports to end of file. This allows presto.js to be used in a NodeJs environment
*  - Add new functions to this object for exports
*
* Version 0.9.15 (13.11.2014)
* New features:
* 1) "markers" filter supports boolean expressions in the following form:
*    [ { "value": [ "A", "B" ] }, { "value": [ "C" ] } ]  =>  (A or B) and (C)
*    [ { "value": [ "A", "B" ] }, { "value": [ "not", [ "C", "D" ] ] } ]  =>  (A or B) and not (C or D)
*    [ { "value": [ "not", [ "A", "B" ] ] } ]  =>  not (A or B)
*    The old structure as well as "markers_and" / "markers_or" filters are not supported anymore.
* Improvements:
* - since "bucket" and "markers" filters do not make much sense together, the "markers" filter is ignored if both are present
*
* Version 0.9.12 (04.07.2014)
* Improvements:
*  - extracted parts of searchByQuery(...) functionality into separate methods
*    (to be able to re-use them, e.g. for preparing test requests)
*  - added a couple of missing 'var's
*
* Version 0.9.11 (23.05.2014)
* Improvements:
*  - added description of the "all_pubs_datasource" field;
*  - added global flag at the beginning of the file CACHING_FLAG to make switching caching on/off easier;
*
* Version 0.9.10 (09.04.2014)
* New features:
* 1) added support for caching markers, as a new variable "cache" in the SearchRequest (by default "false").
*
* Version 0.9.9 (27.02.2014)
* Bug fix:
* 1) as suggested by Roberto, using
*      if (typeof asynch === "undefined") asynch = true;
*    instead of
*      var a = asynch || true;
*
* Version 0.9.8 (26.02.2014)
* Improvements:
* 1) got rid of jquery dependency
* 2) introduced new flag "asynch" as last parameter (false means request will be done synchronously) for methods: highlightText(), highlightUrl(), pqlToJson(), checkSynonym(),
*    and new variable SearchRequest.asynch (default "true").
*
* Version 0.9.7 (19.02.2014)
* Improvements:
* 1) pqlToJson() parses json response only if it's a string.
* 2) filters are created using "terms" query preferred over individual "term".
*
* Version 0.9.6 (05.02.2014)
* Improvements:
* 1) pqlToJson() is replacing new line chars with whitespaces, as suggested by Bastiaan.
*
* Version 0.9.5 (20.01.2014)
* New features:
* 1) added new filter "markers_or", i.e. ensures hits contain at least one of the markers in the provided list.
*    The filter "markers" is renamed to "markers_and" (old name "markers" is still supported and treated as "markers_and").
* Improvements:
* 1) "country codes" filter is applied on publications level, and not on family level. I.e. if user wants to
*    filter out "JP", it will ignore publications with this country code, but not complete families.
*  Bugs:
*  1) fixed bug: incorrect list of parameters in the highlightUrl() method
*
* Version 0.9.4 (04.12.2013)
* Updates:
* 1) added user parameter to all requests to the back-end (it's optional, but it's strongly advisable to provide it from "user-context-service/whoami" call):
*    getFamily(famn, pn, fields, func, user)
*    pqlToJson(query, func, user)
*    highlightText(text, markerQueries, field, strictField, func, user)
*    highlightUrl (url, markerQueries, field, strictField, func, user)
*
* 2) added variable "totalShards" next to "successfulShards" and "failedShards": sometimes "failedShards" is empty, but  successfulShards != totalShards, and it means
*    that the search result is partial!
*
*
* Version 0.9.3 (12.11.2013)
* New features:
* 1) new widget and filter "cc" for country codes.
*    Examples:
*        searchRequest.widgets["cc"] = {"size": 10}
*        searchRequest.filters["cc"] = [{"value": ["EP"]}];
*
* 2) new widget and filter "pubdates" for (oldest) publication dates histogram.
*    The widget expects input (date ranges) in the following format ("from" parameter inclusive, "to" - exclusive):
*      searchRequest.widgets["pubdates"] = {"ranges": [{"to": "2000-01-01"}, {"from": "2000-01-01", "to": "2005-01-01"}, {"from": "2005-01-01", "to": "2010-01-01"}, {"from": "2010-01-01"}]}
*    The filter is configured this way:
*      searchRequest.filters["pubdates"] = [{"value": [{"to": "2000-01-01"}]}] or
*      searchRequest.filters["pubdates"] = [{"value": [{"from": "2000-01-01", "to": "2005-01-01"}]}] or
*      searchRequest.filters["pubdates"] = [{"value": [{"from": "2000-01-01", "to": "2005-01-01"}, {"from": "2005-01-01", "to": "2010-01-01"}]}]
*    Filter is able to support also "and" and "not" operators as other filters, although obviously they do not make much sense for this filter (except may be a single "not" value).
*
*    Response example for widget (there are a few other values provided among these, but it seems they are irrelevant at the moment):
*    ...  "pubdates": {"ranges": [{"to_str": "2000-01-01", "count": 27551938},
*                                {"from_str": "2000-01-01", "to_str": "2005-01-01", "count": 4581656},
*                                {"from_str": "2005-01-01", "to_str": "2010-01-01", "count": 6156534},
*                                {"from_str": "2010-01-01", "count": 5627005}]} ...
*  3) new property searchRequest.user, please initialise with a user id returned by "user-context-service/whoami", required for the logging on the server side.
*  4) buckets widget now returns "max-score" value per bucket, to help users find out in which bucket there are the most "valuable" documents.
*
*
* Version 0.9.2 (11.09.2013)
* New features:
* 1) added highlightUrl() method, which instead of "text" parameter takes "url" parameter.
* 2) when SearchRequest.itemsPerGroup property is negative, the logic will try to return as many high-scored publications as required to cover bucket of the family.
*    But in case of figure search, "-X"  value means that in addition it will try to return X numbers of best-scored figures per publication, i.e.
*    SearchRequest.itemsPerGroup=-5 means that for publication back-end will use "cover the bucket" logic, and per publication it will return up to 5 figures.
* 3) checkSynonym() method, which takes synonym as a first parameter and validates it.
*
* Version 0.9.1 (06.08.2013)
* New features:
* 1) new widget "top-scores", with one mandatory parameter "length". Returns array of top scores with requested length.
*
* Version 0.9 (30.07.2013)
* New features:
* 1) new method shinglesSearch(), for running shingles queries (following Julian Brown's approach).
*    Parameters are identical to moreLikeThis(), except one additional optional parameter at the end "tfIfd" (true|false),
*    which switches on/off calculation of tf/idf scores for shingles (default is "false").
* 2) widget "scores" supports parameters "min" (default 0), "max" (default 10) and
*    "steps" (default 100, meaning inteval min..max will be sliced in 100 slices).
* 3) new flag in string-based widgets (i.e. all classes) "weighted", by default = false.
*    If set to true, the ordering of returned widget items will be driven by summary of document scores
*    in which this item has occurred.
*    For example, response for ordinary widget searchRequest.widgets["cpc"] = {"size": 10} :
*
*    cpc: {
*        _type: "terms",
*        missing: 1376,
*        total: 3167,
*        other: 1893,
*        terms: [
*        {term: "h01l2224", count: 198},
*        {term: "h01l2924", count: 192},
*        {term: "h01l24",count: 190},
*        {term: "h01l23",count: 168},
*        ...
*     And the same response for "weighted" version searchRequest.widgets["cpc"] = {"size": 10, "weighted": true} :
*     cpc: {
*        _type: "wterms"
*        missing: 1376,
*        total: 3167,
*        total_weight: 71,
*        other: 2691,
*        terms: [
*        {term: "b24b37", count: 22, weight: 4.5659},
*        {term: "h04n19", count: 117, weight: 2.9383},
*        {term: "h04n7", count: 111, weight: 2.9383},
*        {term: "d04h3", count: 5, weight: 2.8517},
*        ...
*     As shown in the example, "weighted" result contains the same attributes as the normal one,
*     but result is ordered according to additional "weight" attribute, which is a summary of
*     document scores in which this "term" occured. In addition, top level "total_weight"
*     is provided, with the summary of all weights.
*     The idea behind the widget is to show on top terms which occurred in most "relevant" (high-scored) documents.
*
*
* Version 0.8.13 (16.07.2013)
* New features:
* 1) new widget and filter with the name "kw" for keywords.
* 2) SearchRequest.itemsPerGroup property supports values "-1", which means that application instead of providing fixed number
*    of results will provide only those which cover (contain in summary) all markers in the bucket for the result. It means, if first publication
*    in the family contains all markers, only this one will be returned. If first one misses some merkers from the bucket, then more
*    publications are returned. This feature intruduced after a discussion with Pablo & Roberto and is intended to reduce number of publications
*    returned in the result. Currently we always return a fixed number of publications (3). Recommended to apply ASAP.
*
* 3) highlighting supports property "hits_only" (with values true or false). By default is false, but when set to true, server returnes only those
*    highlighted snippets which contain a hit. The intention is to avoid returning e.g. fulltext snippets which don't have any hits and can "shadow" other
*    text attributes with real hits (e.g. if there was a hit in title, but description snippets are displayed). Recommended to apply ASAP.
*    Please note: for multivalued fields, if at least one of values has a hit, complete list is returned with values without hits as nulls, e.g.
*    for reference phrases [null,null,null,"<span class='mA'>banana</span> mama",null]
*
* Version 0.8.12 (03.07.2013)
* Fixes:
* 1) fixed numbersSearch() method, which always used dummy match-all query even if markers were provided
*
* Version 0.8.11 (03.07.2013)
* Fixes:
* 1) use "match-all" query if markers are empty in numbersSearch() method.
*
* Version 0.8.10 (02.07.2013)
* New features:
* 1) new method numbersSearch() which takes next to SearchRequest an array of family numbers (a "drawer"). Search keeps all requested numbers
*    in the result and calculates required statistics. It's important that SearchRequest doesn't contain any filters, otherwise result might not
*    contain all expected numbers.
*    Example of invocation: es.numbersSearch(searchRequest, [21897687, 34931294, 23027090], handleSearchResult, 0, 10);
*
* Version 0.8.9 (02.07.2013)
* New features:
* 1) highlighter supports value 0 for property "number_of_fragments". It means text is not broken into fragments and highlighted completely.
*    This value strongly recommended for all small text fields, i.e. any fields except description and claims.
*    Such fields are too small to be broken into segments and pay performance penalty for no reason when number of segments is more than 0.
*
* Fixes:
* 2) fixed issue with the "bucket" filter.
*
* Version 0.8.8 (17.06.2013)
* New features:
* 1) SearchRequest has new property "timeout", which defines (in seconds) maximum amount of time for query to be executed.
*    Default is 60 seconds.
*
* Version 0.8.7 (05.06.2013)
* Fixes:
* 1) fixed ES filters definitions for "dates" filter
*
* Version 0.8.6 (05.06.2013)
* Updates:
* 1) lowercasing PN in the getFamily() method (all pns are lowercased in the index)
*
* Version 0.8.5 (04.06.2013)
* New features:
* 1) method getFamily() now accepts empty (undefined or null) family number if publication number is not empty. In such a case it
*    tries to find family by publication number. The case when family number is provided and publication number not is also supported (as before).
*    Please note that all pns provided by the index are in the DOCDB format. The pn in EPODOC format is indexed (i.e. you can search by it),
*    but it's not provided.
*    Please also note that requests with family number are much more efficient than without (please use it if you have it).
* 2) support for "NOT" filters via operator property "op": [{"value": ["a", "b"], "op": "and"}, {"value": ["c"], "op": "not"}]
*    Two values are supported: "not" and "and" (default).
*    For example: searchRequest.filters["numbers"] = [{"value": [34542196, 45938364 , 17747439], "op": "not"}];
*
* Version 0.8.4 (27.05.2013)
* Updates:
* 1) as suggested by Bastiaan, fields "publications.figs" and "publications.figures.boxes" are parsed into JSON.
*
* Version 0.8.3 (23.05.2013)
* Updates:
* 1) fixed filter "languages"
*
* Version 0.8.2 (23.05.2013)
* Updates:
* 1) fixed filter "dates", also now it expects "dates" element at the end of the array (to avoid confusion with values):
* searchRequest.filters["dates"] = [{"value": ["p-or-e"]}, {"dates": {"prio-date":"2003-10-14", "filing-date":"2004-10-13"}}];
*
* Version 0.8.1 (23.05.2013)
* New features:
* 1) added SearchResponse.successfulShards and SearchResponse.failedShards for detecting partial results.
* 2) added "cpc_complete" widget and filter, with non-truncated CPC symbols
*
* Changes:
* 3) fixed parameter names for filter "dates": 'in-time' and 'p-or-e' (used to be 'in_time' and 'p_or_e')
* 4) changed format of dates for "dates" filter and widget. Before: "dd.MM.yyyy", now: "yyyy-MM-dd"
* 5) updated description of fields with boxes and figures (contain JSON instead of custom format)
* 6) "numbers", "dates" and "languages" filters now follow the boolean logic of other filters. The filter "strict_languages" stays as an exception.
*    Note that "dates" filter needs two additional parameters which are expected to be provided like this:
*    searchRequest.filters["dates"] = [{"value": ["in-time"]}, {"prio-date":"2003-10-14"},{"filing-date":"2004-10-13"}];
*
*
* Version 0.8 (16.05.2013)
* Updates and changes:
* 1) as recommended by Roberto, added to the pqlToJson() and doRequest() methods the line: jsonRequest["contentType"] = "application/json; charset=utf-8";
* 2) method getFamily() now accepts parameters pn (publication number in docdb form as country code + number + kind code) and list of fields to return;
* 3) numerous new fields were added, e.g. for cci and cca, also for other classes, and for highlighting reference phrases and getting figure boxes.
*    See full description of new fields below in the list of all fields.
*    Note that field "publications.references" is now replaced by two other fields ("publications.refs" and "publications.refphrases_xx").
*    Boxes for complete publication are available in the field "publications.figs".
*    Also note that on all levels "datasource" fields are now containing all 4 parts.
* 4) responses from pqlToJson() and highlightText() always contain two additional values: "pql-date" and "pql-version".
*    SearchResponse contains properties "version" and "buildDate" with the same attributes for the "nested hits" plug-in.
* 5) all returned field values are presented as an array.
* 6) "fragment_words_number" should be replacing obsolete "fragment_size" in the highlighting field info.
*    Since our field values are full of XML mark-up, it's difficult to make sure that the lenght of the snippet
*    is as requested when the mark-up is removed. Other approach relies on the number of words in the snippet, which can be easily controlled.
*    Try to start with "fragment_words_number": 20, should be enough for the beginning.
*
* Version 0.7.1 (26.04.2013)
* New features:
* 1) method ES.highlightText now supports two additional parameters, "field" and "strictField": function(text, markerQueries, field, strictField, func).
*    Parameter "field" defaults to "publications.desc_en" and specifies which field's analyzer should be used to tokenize provided text during highlighting.
*    Normally expected "publications.desc_en" for english text, "publications.desc_de" for German and "publications.desc_fr" for French.
*    Parameter "strictField", if set to "yes" or "true", makes sure that only those query terms are highlighted, which belong to the same field as
*    the provided text. E.g. if "field" = "publications.desc_en" and one marker is provided "banana/ti or apple/desc", then only "apple" is highlighted.
* 2) SearchRequest.highlighterName is deprecated and ignored - server will be deciding himself which highlighter to use.
*
* Fixes:
* 2) removed alert() method when is figure search is executed.
*
* Version 0.7 (17.04.2013)
* New features:
* 1) new filter "dates": takes as 'value' parameter: 'in-time', 'p-or-e', 'late', 'unknown'.
*    Also requires two other parameters: 'prio-date' and 'filing-date' (dates formatted as "yyyy-MM-dd").
* 2) field "publications.datasource" (and "rep_datasource") now contains family id as a prefix, e.g. "001234567/CA1138474A119821228/51018634c02d6ebd910fa3b2"
*    It's done in order to avoid custom padding with zeroes.
* 3) added proper support for "dates" widget (it was declared before, but the widget was ignored!)
* 4) re-design of filters API. Filters has become more complex and can handle AND and OR cases using the following syntax:
*     {"filter_type": [{"value": ["value1", "value2" ... "valueN"]}, {"value": ["value1", "value2" ... "valueM"]}, ...]}
*    For example: {"cpc": [{"value": ["H01", "B02"]}, {"value": ["C01"]}]} - is expected to create a filter with ((H01 or B02) and C01) values.
*    Please note that multiple AND items make sense only for classification filters, "inventor" and "applicant" ones.
*    For other types only first item is taken into account.
*    "languages" will be also supported soon.
*  5) new method ES.getFamily(familyNumber, func), which delivers complete structure of a family by family number. Please note that provided
*     fields are hardcoded at index time and user can't influence it at request time. Fields provided:
*     - for family level: "opubd_full" (oldest publication date), "oprid_full" (oldest priority date), "rep_datasource".
*     - for publication level: "app_fdate" (application filing date), "all_pubs_datasource" (pubid/fulltext_revision/lang), "rep", "datasource"
*     This method is intended to allow GUI to render "in time"/"P or E"/"late" information directly from the index for a particular family.
*  6) new widgets: "uc", "ft", "fi", "ico", "ipc", "ec";
*  7) new filters: "uc", "ft", "fi", "ico", "ipc", "ec";
*  8) new fields: "publications.app_fdate", "publications.all_pubs_datasource", "opubd_full", "oprid_full" (see description below in fields list)
*
* Version 0.6.1 (11.04.2013)
* New features:
* 1) new filter "languages": it takes an array of languages, any of which have to exist within a family, e.g.
*    searchRequest.filters["languages"] = {"value": ["en", "fr"]}; // all docs which have either english or french
* 2) new filter "strict_languages": it takes an array of languages, ALL of which have to exist within a family, e.g.
*    searchRequest.filters["languages"] = {"value": ["en", "fr"]};  // all docs which have both english and french, and do not have german
*
* Fixes:
* 2) SearchRequest.highlighterName attribute was not picked up
*
*
* Version 0.6 (10.04.2013)
* New features:
* 1) added SearchRequest.highlighterName attribute. Possible values: "david" (tested, conventional but slow highlighter) and "luca" (a fast one trying to provide sentences).
*
* Fixes:
* 2) fixed issue in figure search, when not all markers are used in the figure query (cause 'null' value in request, parsing failed on the server side).
*
* Documentation:
* 3) added fields "publications.desc_*" and "publications.claims_*" to the list of supported fields.
*
*
* Version 0.5 (05.04.2013)
* New features
* 1) figure search is implemented. See attribute SearchRequest.markerPositions and method ES.figureSearch(...).
*    Widgets and filters can be used the same way as for usual marker search.
*    Reponse will contain hits scored by figures (in three levels: first - families, then nested publications, then nested figures).
*    Figure hits are situated in the array response.hits[i].hits[j].hits, fields are available on this level
*    as well (e.g. response.hits[i].hits[j].hits[n].fields).
*    New figure fields are described below at the bottom of fields description (their names start with "publications.figures.")
* 2) new fields: representative titles, abstracts and datasource are added to the family level (see description of available fields below).
*
*
* Version 0.4 (28.03.2013)
* New features
* 1) highlightText(text, markerQueries, func) method supports array (to highlight multiple values at once) as well as
*    single text values (as before) for "text" parameter. For example:
*    searchRequest.text = ["Text to be nicely highlighted.", "Second text", "Third text"] or
*    searchRequest.text = "Single text to be nicely highlighted."
*    Response contains text response elements in the same order as provided to the method.
* 2) new widget: "scores". Provides distribution of scores for the result set. It takes no parameters so far.
*    Result example: {"entries":[{"score":"BELOW","count":108213},{"score":0.0,"count":108213},{"score":0.05,"count":1189},{"score":0.1,"count":45}...{"score":4.95,"count":1},{"score":"ABOVE","count":1}]}
*    Every entry says how many documents have score value higher than its "score" parameter.
*    At the moment, there are always 100 entries plus 2 special ones. Minimum score is zero, maximum is 10.
*    Special entry "BELOW" means "number of documents with the score higher than zero".
*    Special entry "ABOVE" means "number of documents with the score higher than 10".
* 3) new widget: "dates". Takes two parameters: "prio-date" and "filing-date" of the application in the format "dd.MM.yyyy".
*    Example: searchRequest.widgets["dates"] = {"prio-date": "02.02.2005", "filing-date": "03.03.2007"};
*    Returns 4 counters: {"in-time": 95562, "late": 0, "p-or-e": 0, "unknown": 0}
*    Please note that corresponding filter is not ready yet.
* 4) SearchRequest.markerPositions is introduced for figure search (see SearchRequest below), as well as method  ES.figureSearch().
*    Even though it doesn't work properly yet, this is the request API (you can start develop against it).
*    In the future response will include for every publication list of drawings which contained the hit for figure query.
*
*  Documentation
* 5) see below a description of fields which can be requested in the searchRequest.fields property (array).
*    Fields which start with "publications." prefix are provided as array on the level of
*    nested (publication) hits (response.hits[i].hits[j].fields), others are provided on the level of
*    group (family) hits (response.hits[i].fields).
*    Please note: they are requested in a single array, but in the response happen to be on different "levels".
*
*
* Version 0.3.1 (20.03.2013)
* Bug-fixes
* Corrected behaviour of searchRequest.bucket property: when it's not defined, all buckets are returned ("flat" search result). When
* it's set to an empty array, hits of the "empty" bucket are returned (i.e. ones which do not fall into any marker). It's important for "find similar".
* Also now it's possible to avoid providing marker queries for find similar.
*
*
* Version 0.3 (18.03.2013)
* Change log:
* API changes
* 1) SearchRequest.text is now array of text snippets
* 2) "moreLikeThis" function expects marker queries to be provided in the SearchRequest. Response is build following the logic of the
*    markers search, and can use widgets and filters available to markers search.
*    It also means response is broken into "buckets" (empty one means its search hits didn't fit any bucket).
* New features
* 3) new filter "numbers": this filter is a list of family numbers the search is limited to.
*    It is expected that numbers will either be a list of deja-vu numbers, or xfile/drawer numbers.
*    Example: searchRequest.filters["numbers"] = {"value": ["012345", "012346", "7777999"]};
*
*
* Version 0.2 (15.03.2013)
* Changes since previous version (initial one):
* 1) API update: filters and widgets are not arrays anymore, but associative arrays where
*    key is the name of the widget/filter, and value is a map of keys and values.
* 2) new filters: "bucket" and "markers"
*    Request property "bucket" affects only search result, while all widgets (facets) are still calculated across all available buckets.
*    On the contrary, if "bucket" filter is provided in the request, all widgets (facets) are calculated
*    only for this specific bucket. Note: searchRequest.bucket and filter "bucket" (if provided) have to contain the same value!
*    Another note: these two filters are mutually exclusive: when used together, search will most likely fail.
* 3) new widgets: "inventor", "applicant", "languages"
* 4) new filters: "inventor" and "applicant"
* 5) new parameter in the SearchRequest: minScore. It is expected to be used together with the widget
*    "score", which shows user the score distribution in the result list. User can pick the minimum score
*    for documents, which means this value becomes effectively a filter: after search is executed with it,
*    it doesn't include values below the minScore.
*/

/**
 * Supported widget names: "bucket", "cpc", "cpc_complete", "ci", "ci_complete",  "ca", "ca_complete", "inventor", "applicant", "languages", "dates", "scores", "top-scores", "uc", "ft", "fi", "ico", "ipc", "ec", "kw", "cc", "pubdates"
 * Supported filter names: "bucket", "markers", "markers_and", "markers_or", "cpc", "cpc_complete", "ci", "ci_complete", "ca", "ca_complete", "inventor", "applicant", "numbers", "strict_languages", "languages", "dates", "uc", "ft", "fi", "ico", "ipc", "ec", "kw", "cc", "pubdates"
 *
 * Supported family fields:
 * "all_pubs_datasource": all publications for the family, grouped by application, e.g."[["018787174/EP1198083A220020417/4465a60f26e08bd27c79b3ed9452ce6c/EN","018787174/EP1198083A320031126//"],["018787174/US2002041661A120020411/9fb608e17d499c739d580fe104ae15c5/EN","018787174/US6647098B220031111/8aa88484ff361325820bffca6eda220a/EN"]]"
 * "langstats": statistics of languages across the family, e.g. "en:107;" or "en:107;de:12;fr:2"
 * "lang": info on available languages in the family without counts, e.g. "--en--" or "deen--" or "--enfr" and so forth...
 * "in.untouched": aggregated list of all inventors for the family
 * "pa.untouched": aggregated list of all applicants for the family
 * "rep_topdrawings": suffixes of top 5 drawings of the representative publication
 *                    http://host:port/tei/families/{famn}/publications/{publication id}/facsimile{suffix}
 * "rep_ti_en": english title of the representative
 * "rep_ti_de": german title of the representative
 * "rep_ti_fr": french title of the representative
 * "rep_abs_en": english abstract of the representative
 * "rep_abs_de": german abstract of the representative
 * "rep_abs_fr": french abstract of the representative
 * "rep_datasource": famn/pn/fulltext/lang of the representative, see below description of the "publications.datasource" field
 * "opubd_full.untouched": oldest publication date
 * "oprid_full.untouched": oldest priority date
 * "cpc_full": list of CPC classes
 * "cca_full": list of CCI/CPC classes
 * "cci_full": list of CCA/CPC classes
 * "ec_full": list of EC classes
 * "ico_full": list of ICO classes
 * "ipc_full": list of IPC classes
 * "uc": list of US classes
 * "ft": list of FT classes
 * "fi": list of FI classes
 *
 * Supported publication fields:
 * "publications.datasource": famn/publication-id/fulltext/lang (publication id includes date in the format "yyyyMMdd") plus fulltext revision id (can be empty), e.g. "012345/CA1138474A119821228/51018634c02d6ebd910fa3b2/EN"
 *                            URL rules: http://kimehost:port/tei/families/{family id}/publications/{publication id}/fulltexts/{revision id}/description (or .../claims)
 * "publications.ti_en": english title of the publication
 * "publications.ti_fr": french title of the publication
 * "publications.ti_de": german title of the publication
 * "publications.abs_en": english abstract of the publication
 * "publications.abs_fr": french abstract of the publication
 * "publications.abs_de": german abstract of the publication
 * "publications.desc_en": english abstract of the publication
 * "publications.desc_fr": french abstract of the publication
 * "publications.desc_de": german abstract of the publication
 * "publications.claims_en": english abstract of the publication
 * "publications.claims_fr": french abstract of the publication
 * "publications.claims_de": german abstract of the publication
 * "publications.drawings": array of compressed URL prefixes of the drawings of the publication - see decompressDrawings() utility function
 *                             http://host:port/tei/families/{famn}/publications/{publication id}/facsimile{suffix}
 * ***** only one of the three fields below is populated *****
 * - "publications.refphrases_en": array of reference phrases of the english fulltext, e.g. ["vacuum pump", "valve", "network"].
 *                               To find corresponding reference sing, see field "publications.refs" below.
 * - "publications.refphrases_de": array of reference phrases of the german fulltext
 * - "publications.refphrases_fr": array of reference phrases of the french fulltext
 * "publications.refs": array of reference signs, corresponding to one of the three fields above (by position), e.g. ["8", "3a", "3b"]
 * "publications.uc": list of US classes
 * "publications.ft": list of FT classes
 * "publications.fi": list of FI classes
 * "publications.figs": array of the figures which belong to the publication. Each value is a JSON object, for example:
 *                      {"orientation":1,"sheet":7,"figure":1,"reliability":0.4674999713897705,"source":"/US7962010B2/7","lang":"en","boxes":[["32",1669,1178,49,38],["60",1647,1289,76,37],["55",1795,229,72,41],["10",1730,1289,43,37]]}
 * "publications.in.untouched": inventors for the publication
 * "publications.pa.untouched": applicants for the publication
 * "publications.rep": "F" means not representative, "T" means representative
 * "publications.app_fdate": application filing date
 * "publications.all_pubs_datasource": datasources for complete publication cycle
 *
 * Supported figure fields:
 * "publications.figures.orient": orientation of the figure (0 means portrait, 1 means landscape)
 * "publications.figures.sheet": sheet number of the drawing page with the figure in the facsimile
 * "publications.figures.fig": number of the figure on the drawings
 * "publications.figures.reliability": OCR results reliability for the figure
 * "publications.figures.datasource": URL suffix of the drawing with the figure. URL content can be built e.g.
 *                                http://host:port/tei/families/{famn}/publications/{publication id}/facsimile{source}
 * "publications.figures.lang": language of the figure ("en", "de" or "fr")
 * "publications.figures.boxes": reference signs on the figure as an array of boxes, including ref sign, x, y, width, height for each reference sign,
 *                               for example "[["32",1669,1178,49,38],["60",1647,1289,76,37],["55",1795,229,72,41],["10",1730,1289,43,37]]"
 */

    var MAX_SEARCH_CACHE_TIME =  1 * 60 * 60 * 1000; // 1 hour
    var MAX_SEARCHES_CACHED = 100;

    var CACHING_FLAG = true;

    var WIDGET_FIELD_MAPPING = {"cpc": "cpc_main",
                                "cpc_complete": "cpc_full",

                                "ci": "cci_main",
                                "ci_complete": "cci_full",

                                "ca": "cca_main",
                                "ca_complete": "cca_full",

                                "inventor": "in.untouched",
                                "applicant": "pa.untouched",
                                "kw": "kw.untouched",
                                "languages": "lang",
                                "ipc": "ipc_main",
                                "uc": "uc",
                                "ft": "ft",
                                "fi": "fi",
                                "cc": "cc",
                                "pubdates": "pd",
                                // special case
                                "numbers": "famn"};

    var PUBLICATION_FILTERS_MAPPING = {
        "cc": "publications.cc"
        //"languages": "publications.lang"
    };

    var SEARCH_URL = "/_search?search_type=count";

    var JSON_FIELDS_TO_PARSE = {"biblio": true,
                                "publications.figs": true,
                                "publications.figures.boxes": true,
                                "all_pubs_datasource": true};


    function SearchRequest() {
        // map of marker queries, key - name, value - content (string)
        this.markerQueries = {};
        // positions of the markers for figure search, key - marker name, value - array with positions, e.g. [[10,20], [30,40], [30,50]]
        this.markerPositions = {};
        // map of filters, key - name, value - content (another map)
        this.filters = {};
        // array of fields to be returned
        this.fields = [];
        // highlighting data
        this.highlighting = [];
        // name of the highlighter to be used, either "david" or "luca"
        this.highlighterName = "david";
        // array of deja-vu numbers (family numbers)
        this.dejavu = [];
        // map of widgets, key - name, value - content (another map)
        this.widgets = {};
        // array of markers which comprise a bucket to be returned: influences result list
        // (i.e. only documents in this bucket will present in the result list),
        // but doesn't influence widget statistics, i.e. widgets are still calculated across all buckets
        this.bucket = null;
        // number of nested publications to be returned within each family
        this.itemsPerGroup = 3;
        // more-like-this (find similar) array of text snippets to be used for searching
        this.text = [];
        // only documents with higher score than this value will be included into the search result
        this.minScore = -1;
        // maximum time to execute the query in seconds, default: 1 minute
        this.timeout = 60;
        // user id
        this.user = "unknown";
        // asynch request: true or false
        this.asynch = true;
        // cache request: true or false
        this.cache = CACHING_FLAG;
    }

    function ES(url, callback) {
        this.url = url;
        this.callback = callback;
        this.index = "patents";
        this.markersCacheTimestamp = {};
        this.searchesCache = {};
    }

    function SearchResponse(data, request) {
        this.took = 0;
        this.successfulShards = 0;
        this.failedShards = 0;
        this.totalShards = 0;
        this.hits = [];
        this.widgets = [];
        this.familiesNumber = 0;
        this.publicationsNumber = 0;
        this.requestString = "";
        this.version = "";
        this.buildDate = "";

        this.loadFromSearchResult = function(data, request, status) {
            // in case of error data will come unparsed
            if (typeof data !== "object") {
                try {
                    data = JSON.parse(data);
                }
                catch (e) {
                    this.errorMessage = "Unexpected server error: " + status;
                }
            }

            if (data.hasOwnProperty("error")) {
                this.errorMessage = "Search failed: " + this.detectErrorType(data.error.reason.reason);
            }
            else {
                this.took = data.took;

                if (data._shards) {
                    this.successfulShards = data._shards.successful;
                    this.failedShards = data._shards.failed;
                    this.totalShards = data._shards.total;

                    if (data._shards.failed > 0 || data._shards.successful != data._shards.total) {
                        console.log("Partial results: failed " + data._shards.failed + ", total " + data._shards.total + ", successful " + data._shards.successful);

                        if (data._shards.failures && data._shards.failures.length > 0) {
                            // TODO: collect distinct errors from all the failed shards ???
                            this.errorMessage = "Incomplete search results: " + this.detectErrorType(data._shards.failures[0].reason.reason);
                        }
                        else {
                            // should never happen?
                            this.errorMessage = "Search results are incomplete";
                        }
                    }
                }
                this.extractResultAggregations(data.aggregations);
            }
        }

        this.extractResultAggregations = function(aggregations) {
            for (var name in aggregations) {
                var agg = aggregations[name];
                if (name == "NestedHitsFacetPlugin") {
                    this.familiesNumber = agg.groups;
                    this.publicationsNumber = agg.hits;
                    this.version = agg.version;
                    this.buildDate = agg["build-date"];
                    // populating results
                    for (var i in agg.nested) {
                        // family object
                        var searchGroup = {
                            "familyNumber": agg.nested[i].group,
                            "publicationsCount": agg.nested[i].total,
                            "bucket": agg.nested[i]["all-buckets"],
                            "fields": agg.nested[i].fields
                        };
                        searchGroup.hits = new Array();
                        for (var k in agg.nested[i].hits) {
                            // publication object
                            var groupItem = {
                                "score": agg.nested[i].score,
                                "bucket": agg.nested[i].hits[k].bucket,
                                "highlighting": agg.nested[i].hits[k].highlighting,
                                "hits": agg.nested[i].hits[k].hits,
                                "fields": agg.nested[i].hits[k].fields
                            };
                            searchGroup.hits.push(groupItem);
                        }
                        this.hits.push(searchGroup);
                    }
                    // some fields are json-strings, parse them to JSON!
                    this.parseJsonFields(JSON_FIELDS_TO_PARSE);
                    // aggregation with buckets is situated in the nested hits section
                    if (agg.buckets.length > 0) {
                        // init bucket widget
                        var buckets = new Array();
                        for (var k in agg.buckets) {
                            var bucket = {
                                "labels": agg.buckets[k].bucket,
                                "count": agg.buckets[k].count,
                                "dejavu": agg.buckets[k]["deja-vu"],
                                "max-score": agg.buckets[k]["max-score"]
                            };
                            buckets.push(bucket);
                        }
                        this.widgets["bucket"] = buckets;
                    }
                } else if (name == "languages") {
                    var langTerms = [];
                    for (var t in agg.terms) {
                        var item = {"count": agg.terms[t].count, "term": []};
                        if (agg.terms[t].term.substring(0, 2) == "de") {
                            item["term"].push("de");
                        }
                        if (agg.terms[t].term.substring(2, 4) == "en") {
                            item["term"].push("en");
                        }
                        if (agg.terms[t].term.substring(4) == "fr") {
                            item["term"].push("fr");
                        }
                        langTerms.push(item);
                    }
                    aggregations[name].terms = langTerms;
                    this.widgets[name] = aggregations[name];
                } else { // other widgets do not need interpretation
                    this.widgets[name] = aggregations[name];
                }
            }
        }

        this.detectErrorType = function(errorText) {
            if (errorText && errorText.indexOf("[Failed to execute") != -1) {
                if (errorText.indexOf("Too many terms") != -1) {
                   return "Query covers too many terms - please use more specific truncation(s)";
                }

                // nested: IllegalArgumentException['EC' is not a recognized field.];
                var match = errorText.match(/nested:\s*\w+Exception\[([^\[\]]+)\]/);
                if (match !== null) {
                    return match[1];
                }

                return "Invalid query";
            }

            return "Unknown error";
        }

        this.parseJsonFields = function(fields2parse) {
           this.parseJsonFieldsInHits(this.hits, fields2parse);
           for (var pub in this.hits) {
               this.parseJsonFieldsInHits(this.hits[pub].hits, fields2parse);
               for (var fig in this.hits[pub].hits) {
                   this.parseJsonFieldsInHits(this.hits[pub].hits[fig].hits, fields2parse);
               }
           }
       }

       this.parseJsonFieldsInHits = function(hits, fields2parse) {
           if (typeof hits != 'undefined') {
               for (var hit in hits) {
                   var fields = hits[hit]["fields"];
                   if (typeof fields != 'undefined') {
                       for (var i in fields) {
                           if (fields2parse[i] != undefined) {
                               var jsonValues = [];
                               for (var f in fields[i]) {
                                   jsonValues.push(JSON.parse(fields[i][f]));
                               }
                               fields[i] = jsonValues;
                           }
                       }
                   }
               }
           }
       }
    }

    ES.prototype.createXmlHttp = function createXmlHttp() {
        try {
              return new XMLHttpRequest();
        } catch (e) {
              try {
                    return new ActiveXObject("Microsoft.XMLHTTP");
              } catch (e) {
                    return null;
              }
        }

    }

    ES.prototype.putInCache = function(requestString, responseString) {
      var oldest = null;
      for (var i in this.searchesCache) {
            var item = this.searchesCache[i];
            if ((new Date() - item.timestamp) > MAX_SEARCH_CACHE_TIME) {
              delete this.searchesCache[i];
              console.log("putInCache(): Removed old item " + i);
            } else {
                if (oldest == null || oldest.timestamp < item.timestamp) {
                  oldest = i;
                }
            }
        }

      if (Object.keys(this.searchesCache).length >= MAX_SEARCHES_CACHED) {
            console.log("putInCache(): Removed oldest item " + oldest);
        delete this.searchesCache[oldest];
      }

      this.searchesCache[requestString] = {"timestamp": new Date(), "value": responseString};
    }

    ES.prototype.getFromCache = function(requestString) {
      var result = this.searchesCache[requestString];
      if (typeof(result) !== 'undefined' && result !== null) {
        if ((new Date() - result.timestamp) > MAX_SEARCH_CACHE_TIME) {
          result = null;
          delete this.searchesCache[requestString];
                console.log("getFromCache(): Removed too old item " + requestString);
        } else {
          result = result.value;
        }
      } else {
        result = null;
      }

      return result;
    }

    ES.prototype.ajaxRequest = function(resource, method, bodyObject, success, error, async, cache) {
        var that = this;
        var successCallback = success;
        if (cache) {
            // FIXME: also use resource as part of the cache key ???
            var cacheKey = JSON.stringify(bodyObject);
            var cachedResult = this.getFromCache(cacheKey);
            if (cachedResult !== null) {
                console.log("Re-used item from cache, cache size " + Object.keys(this.searchesCache).length);
                setTimeout(function() {
                    if (typeof success === 'function') {
                        success(JSON.parse(cachedResult), 200, "cached result", cachedResult);
                    } else {
                        that.callback(JSON.parse(cachedResult), 200, "cached result");
                    }
                }, 25);
                return;
            }

            // replace the callback to cache the response
            successCallback = function(data, status, statusText, rawResponse) {
                that.putInCache(cacheKey, rawResponse);
                console.log("Added to cache new item, cache size " + Object.keys(that.searchesCache).length);

                if (typeof success === 'function') {
                    success(data, status, statusText, rawResponse);
                } else {
                    that.callback(data, status, statusText);
                }
            };
        }

        var xmlhttp = this.createXmlHttp();
        if (typeof async === "undefined") async = true;
        if (xmlhttp !== null) {
            xmlhttp.open(method, this.url + resource, async);
            xmlhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        if (typeof successCallback === 'function') {
                            successCallback(JSON.parse(xmlhttp.responseText), xmlhttp.status, xmlhttp.statusText, xmlhttp.responseText);
                        } else {
                            that.callback(JSON.parse(xmlhttp.responseText), xmlhttp.status, xmlhttp.statusText);
                        }
                    } else {
                        if (typeof error === 'function') {
                            error(xmlhttp.responseText, xmlhttp.status, xmlhttp.statusText);
                        } else {
                            that.callback(xmlhttp.responseText, xmlhttp.status, xmlhttp.statusText);
                        }
                    }
                }
            };

            if (bodyObject) {
                xmlhttp.send(JSON.stringify(bodyObject));
            }
        } else {
            console.log("Can't create HttpRequest instance.");
        }
    }

    ES.prototype.search = function(searchRequest, func, from, size) {
      // normal marker search: update the cache
      if (typeof searchRequest.filters == 'undefined' || searchRequest.filters == null || Object.keys(searchRequest.filters).length == 0) {
          this.updateMarkersCaching(searchRequest);
      }

        var query = this.createMarkersQuery(searchRequest);
        query = this.createNestedQuery(query, "publications");
        this.searchByQuery("markers", query, searchRequest, func, from, size);
    }

    ES.prototype.numbersSearch = function(searchRequest, numbers, func, from, size) {
        var markersQuery = this.createMarkersQuery(searchRequest);
        if (typeof markersQuery["pql_query_string"].markers == 'undefined' || markersQuery["pql_query_string"].markers.length == 0) {
            // markers were empty; make dummy "match-all" query
            markersQuery = {"query_string": {"query": "publications.famn:*"}};
        } else {
          // make sure markers are cached
          this.forceMarkersCaching(searchRequest);
        }
        // the trick is to combine filter on numbers (so that ONLY numbers are found)
        // with the list of numbers in the query, so that they are ALL found
        var sNumbers = stringifyFamn(numbers);
        var boolQuery = {"bool" : {
                             "should": [markersQuery, {"terms": {"publications.famn": sNumbers, "minimum_should_match": 1}}],
                             "disable_coord" : true
                        }};

        var query = this.createNestedQuery(boolQuery, "publications");
        // if numbers filter has not been defined
        if (typeof searchRequest.filters["numbers"] == 'undefined' || searchRequest.filters["numbers"] == null) {
          searchRequest.filters["numbers"] = [];
        }
        // add numbers a part of the numbers filter
        searchRequest.filters["numbers"].push({"value":sNumbers});

        this.searchByQuery("numbers", query, searchRequest, func, from, size);
    }

    ES.prototype.getFamily = function(famn, pn, fields, func, user, asynch) {
        var query = {"bool":{"must": []}};
        famn = stringifyFamn(famn);
        if ((typeof famn != 'undefined') && famn != null && famn != '') {
            query.bool.must.push({"term": {"publications.famn": famn}});
        }
        if ((typeof pn != 'undefined') && pn != null && pn != '') {
            query.bool.must.push({"term": {"publications.pn": pn.toLowerCase()}});
        }
        query = this.createNestedQuery(query, "publications");
        var searchRequest = new SearchRequest();
        searchRequest.fields = fields || [];
        searchRequest.user = user || null;
        if (typeof asynch === "undefined") asynch = true;
        searchRequest.asynch = asynch;
        searchRequest.itemsPerGroup = 500; // absolute maximum, meaning just return all
        this.searchByQuery("getfamily", query, searchRequest, func, 0, 1, famn);
    }

    /**
     * Finds list of families using provided publication numbers in EPOQUE/DOCDB format.
     */
    ES.prototype.findFamiliesByPns = function(pns, isEpoque, fields, func, user, asynch) {
        var query = {"bool":{"should": []}};
        var number = 1;
        if ((typeof pns != 'undefined') && pns != null && pns != '') {
            //query.bool.must.push({"term": {"publications.pn": pn.toLowerCase()}});
          if (pns instanceof Array) {
                for (var i = 0; i < pns.length; i++) {
                   if (isEpoque == false) {
                       query.bool.should.push({"term":{"publications.pn_docdb":pns[i].toLowerCase()}});
                   } else {
                       query.bool.should.push({"term":{"publications.pn_epoque":pns[i].toLowerCase()}});
                   }
                }
                number = pns.length;
            } else {
                if (isEpoque == false) {
                    query.bool.should.push({"term":{"publications.pn_docdb":pns.toLowerCase()}});
                } else {
                    query.bool.should.push({"term":{"publications.pn_epoque":pns.toLowerCase()}});
                }
            }
        }
        query = this.createNestedQuery(query, "publications");
        var searchRequest = new SearchRequest();
        searchRequest.fields = fields || [];
        searchRequest.user = user || null;
        if (typeof asynch === "undefined") asynch = true;
        searchRequest.asynch = asynch;
        searchRequest.itemsPerGroup = 500; // absolute maximum, meaning just return all
        this.searchByQuery("getpubs", query, searchRequest, func, 0, number);
    }


    ES.prototype.getBiblio = function(famn, appNr, func) {
        famn = stringifyFamn(famn);
        var request = {"query": {"term": {"famn": famn}}};
        var url = "/_search?fields=biblio&routing=" + famn;

        var that = this;
        var requestCallback = function(data, status, statusText, rawData) {
            if (status == 200) {
                // extract biblio from searchResponse
                var biblio = {};
                if (data.hits.total == 1) {
                    biblio = JSON.parse(data.hits.hits[0].fields.biblio[0]);
                }
                // "enrich" biblio with aggregate details
                if (appNr) {
                    // we only need a specific application
                    var priority = biblio.priority;
                    biblio = biblio[appNr];
                    enrichApplicationBiblio(biblio);
                    // keep the (global) priority number available
                    if (priority) {
                        biblio.priority = priority;
                    }
                }
                else {
                    enrichBiblio(biblio);
                }

                data = biblio;
            }

            if (typeof func === 'function') {
                func(data, status, statusText, rawData);
            } else {
                that.callback(data, status, statusText);
            }
        };

        this.ajaxRequest(this.index + url, "POST", request, requestCallback, requestCallback, true, true);
    }

    ES.prototype.getForwardCitationsFor = function(pns, fields, func, user, asynch) {
        var query = {"bool":{"should": []}};
        if ((typeof pns != 'undefined') && pns != null && pns != '') {
            if (pns instanceof Array) {
                for (var i = 0; i < pns.length; i++) {
                   query.bool.should.push({"term": {"publications.ct": pns[i].toLowerCase()}});
                }
            } else {
               query.bool.should.push({"term": {"publications.ct": pns.toLowerCase()}});
            }

            query = this.createNestedQuery(query, "publications");
            var searchRequest = new SearchRequest();
            searchRequest.fields = fields || [];
            searchRequest.user = user || null;
            if (typeof asynch === "undefined") asynch = true;
            searchRequest.asynch = asynch;
            searchRequest.itemsPerGroup = 500;
            this.searchByQuery("getfcitations", query, searchRequest, func, 0, 1000);
        }
    }

    ES.prototype.figureSearch = function(searchRequest, func, from, size) {
        var figureQuery = this.createFigureQuery(searchRequest);
        var markerQuery = this.createMarkersQuery(searchRequest);

        var boolQuery = {"bool" : {
                             "should": this.createNestedQuery(figureQuery, "publications.figures"),
                             "must": {
                                 // marker queries are included with 0 score, only to calculate buckets
                                 "constant_score" : {
                                     "query" : markerQuery,
                                     "boost" : 0.0
                                 }
                             },
                             "disable_coord" : true
                        }};

        var query = this.createNestedQuery(boolQuery, "publications");
        this.searchByQuery("figuresearch", query, searchRequest, func, from, size);
    }


    ES.prototype.moreLikeThis = function(searchRequest, lang, func, from, size) {
        this.forceMarkersCaching(searchRequest);
        var query = this.createMoreLikeThisQuery(searchRequest, lang);
        this.executeNonBooleanQuery(query, searchRequest, func, from, size);
    }

    ES.prototype.shinglesSearch = function(searchRequest, lang, func, from, size, tfIdf) {
        this.forceMarkersCaching(searchRequest);
        var query = this.createShinglesQuery(searchRequest, lang, tfIdf);
        this.executeNonBooleanQuery(query, searchRequest, func, from, size);
    }


    ES.prototype.forceMarkersCaching = function(searchRequest) {
        // if request contains markers - make sure they are cached first
        if (Object.keys(searchRequest.markerQueries).length > 0) {
            // TODO: use SHA-1 or some other stronger hash function ???
            var markerQueryId = hashCode(JSON.stringify(searchRequest.markerQueries));

            if (this.markersCacheTimestamp[markerQueryId] instanceof Date &&
                new Date() - this.markersCacheTimestamp[markerQueryId] < 2 * 60 * 60 * 1000) {
                // cache hasn't expired yet
              // update the entry with new date/time
              this.markersCacheTimestamp[markerQueryId] = new Date();
            }
            else { // request the markers to get them cached
                // save actual values for search, except markers
                var origAsync   = searchRequest.asynch;
                var origFilters = searchRequest.filters;
                var origWidgets = searchRequest.widgets;
                var origFields  = searchRequest.fields;
                var origH_ting  = searchRequest.highlighting;
                var origDejavu  = searchRequest.dejavu;
                // make caching request as lightweight as possible
                searchRequest.filters = {};
                searchRequest.fields = [];
                searchRequest.highlighting = [];
                searchRequest.dejavu = [];
                searchRequest.widgets = {};
                searchRequest.asynch = false; // ???

                searchRequest.cache = true;
                this.search(searchRequest, function() { /* dummy handler */ }, 0, 0);
                this.markersCacheTimestamp[markerQueryId] = new Date();

                // restore original values
                searchRequest.asynch = origAsync;
                searchRequest.filters = origFilters;
                searchRequest.fields = origFields;
                searchRequest.highlighting = origH_ting;
                searchRequest.dejavu = origDejavu;
                searchRequest.widgets = origWidgets;
            }
        }
        searchRequest.cache = 'readonly';
    }

    ES.prototype.updateMarkersCaching = function(searchRequest) {
      if (Object.keys(searchRequest.markerQueries).length > 0) {
        // TODO: use SHA-1 or some other stronger hash function ???
            var markerQueryId = hashCode(JSON.stringify(searchRequest.markerQueries));
            this.markersCacheTimestamp[markerQueryId] = new Date();
            return true;
      } else {
        return false;
      }
    }

    /**
     * parameter lang: "en", "de" or "fr"
     */
    ES.prototype.executeNonBooleanQuery = function(nonBoolQuery, searchRequest, func, from, size) {
         var boolQuery = {"bool" : {
                             "must" : nonBoolQuery,
                             "disable_coord" : true
                         }};

         // marker queries are included with 0 score, just to calculate buckets
         if (Object.keys(searchRequest.markerQueries).length > 0) {
             boolQuery.bool["should"] = {
                                 "constant_score" : {
                                     "query" : this.createMarkersQuery(searchRequest),
                                     "boost" : 0.0
                                 }
                             };
         }

         // wrap into nested query
         var query = this.createNestedQuery(boolQuery, "publications");
         this.searchByQuery("mlt", query, searchRequest, func, from, size);
    }

    ES.prototype.createMoreLikeThisQuery = function(searchRequest, lang) {
        var allTexts = "";
        for (var i in searchRequest.text) {
            allTexts = allTexts + searchRequest.text[i] + " ";
        }

        var fields = ["publications.desc_" + lang, "publications.claims_" + lang];
        var percentToMatch = 0.3;
        if (lang == "de") {
            percentToMatch = 0.2;
        }
        return {"more_like_this": {
                                    "like_text": allTexts,
                                    "fields": fields,
                                    "min_term_freq": 1, // The frequency below which terms will be ignored in the source doc. The default frequency is 2.
                                    "percent_terms_to_match": percentToMatch, // The percentage of terms to match on (float value). Defaults to 0.3 (30 percent)
                                    "max_query_terms": 200, // The maximum number of query terms included in any generated query. Defaults to 25.
                                    "min_doc_freq": 2,  // The frequency at which words will be ignored which do not occur in at least this many docs. Defaults to 5.
                                  //"max_doc_freq": 100,  // Words that appear in more than this many docs will be ignored. Defaults to unbounded.
                                    "min_word_len": 3,  // The minimum word length below which words will be ignored
                                    "max_word_len": 25  // The maximum word length above which words will be ignored
                                }};
    }

    ES.prototype.createShinglesQuery = function(searchRequest, lang, tfIdf) {
        var allTexts = "";
        for (var i in searchRequest.text) {
            allTexts = allTexts + searchRequest.text[i] + " . ";
        }
        //"publications.desc_en.shingles_en";
        var fields = ["publications.desc_" + lang + ".shingles_" + lang,
                      "publications.claims_" + lang + ".claims_shingles_" + lang];

        return {"shingles_query" : {
                                    "text": allTexts,
                                    "fields": fields,
                                    "field": "publications.desc_" + lang + ".shingles_" + lang,
                                    "tfidf": tfIdf || false
                                }};
    }

    ES.prototype.searchByQuery = function(type, query, searchRequest, func, from, size, routingValue) {
        var queryWithFilters = this.addFiltersFromSearchRequest(query, searchRequest);
        var aggs = this.buildAggregations(searchRequest, from, size);

        var request = this.buildRequest(queryWithFilters, aggs, searchRequest);

        var url = SEARCH_URL;
        if (routingValue && !isNaN(routingValue) && typeof routingValue != 'undefined' && routingValue != null) {
            url += "&routing=" + ('' + routingValue).toUpperCase();
        }
        if (type && typeof type != 'undefined' && type != null) {
            url += "&reqtype=" + ('' + type).toUpperCase();
        }
        if (searchRequest !== undefined && searchRequest.filters !== undefined && searchRequest.filters.bucket !== undefined) {
        	url += "&openbucket=true";
        }
        if (searchRequest.cache != false) {
            url += "&preference=" + searchRequest.user;
        }

        this.doRequest(this.index + url, request, searchRequest, func);
    }

    ES.prototype.buildRequest = function(queryWithFilters, aggs, searchRequest) {
        var request = {"from": 0, "size": 0, "query": queryWithFilters, "aggs" : aggs};
        if (searchRequest.minScore != -1) {
            request["min_score"] = searchRequest.minScore;
        }
//        request["timeout"] = searchRequest.timeout + "s";

        return request;
    }

    ES.prototype.addFiltersFromSearchRequest = function(query, searchRequest) {
        var familyAndFilters = [];
        var familyNotFilters = [];
        var pubAndFilters = [];
        var pubNotFilters = [];

        // "bucket" and "markers" filters are mutually exclusive with "bucket" having higher precedence
        var hasBucketFilter = "bucket" in searchRequest.filters;

        // make a sanity check
        for (var name in searchRequest.filters) {
            var filter = searchRequest.filters[name];
            if (name == "bucket") {
                if (compareArrays(filter[0].value, searchRequest.bucket) != true) {
                    // TODO: what about the "not" bucket filter? ("all buckets but ...")
                    // console.log("Mistake: filter 'bucket' (" + filter.value + ") and searchRequest.bucket (" + searchRequest.bucket + ") are expected to be equal. Result is unpredictable.");
                }
                if (typeof filter[0].value != "undefined" && filter[0].value != null && filter[0].value.length == 0) {
                    // replace empty bucket filter with "not all markers" filter
                    var labels = [];
                    for (var label in searchRequest.markerQueries) {
                        labels.push(label);
                    }
                    if (labels.length) {
                      query = {"buckets_query": {"query": query, "markers": [ ["not", labels] ]}}; //"markers":[ [ "not", [ "mA", "mB", "mC" ] ] ]
                    }
                } else {
                    query = {"buckets_query": {"query": query, "bucket": filter[0].value}};
                }
            } else if (name == "markers") {
                // ignore "markers" if "bucket" filter is present
                if (!hasBucketFilter) {
                    // TODO: do we need to check if searchRequest.bucket contains at least one marker from the filter?
                    query = {"buckets_query": {"query": query, "markers": this.convertMarkersFilter(filter)}};
                }
            } else if (name == "strict_languages") {
                var filterString = "";
                filterString += this.pickValue(filter[0].value.indexOf("de") > -1, "de", "--");
                filterString += this.pickValue(filter[0].value.indexOf("en") > -1, "en", "--");
                filterString += this.pickValue(filter[0].value.indexOf("fr") > -1, "fr", "--");
                familyAndFilters.push({"term":{"publications.lang": filterString}});
            } else if (name == "pubdates") {
                this.createEsFilter(name, filter, familyAndFilters, familyNotFilters, pubAndFilters, pubNotFilters, createPublicationDatesFilter);
            } else if (name == "languages") {
                this.createEsFilter(name, filter, familyAndFilters, familyNotFilters, pubAndFilters, pubNotFilters, createLangTermFilter);
            } else if (name == "dates") {
                this.createEsFilter(name, filter, familyAndFilters, familyNotFilters, pubAndFilters, pubNotFilters, createIndividualDatesFilter);
            } else {
                // stuff like "cpc", "inventor", "applicant", etc...
                this.createEsFilter(name, filter, familyAndFilters, familyNotFilters, pubAndFilters, pubNotFilters, createSimpleTermFilter);
            }
            // TODO add more filters
        }

        if (pubAndFilters.length > 0 || pubNotFilters.length > 0) {
            if (query["nested"] != undefined) {
                // usual nested query
                query["nested"]["query"] = this.addBoolFilters(
                        query["nested"]["query"], pubAndFilters, pubNotFilters);

            } else if (query["buckets_query"] != undefined) {
                // buckets query
                query["buckets_query"]["query"]["nested"]["query"] = this.addBoolFilters(
                        query["buckets_query"]["query"]["nested"]["query"], pubAndFilters, pubNotFilters);

            } else {
                // coding mistake
                console.log("Mistake: expected either nested query or buckets_query, found: " + JSON.stringify(query));
            }
        }

        if (familyAndFilters.length > 0 || familyNotFilters.length > 0) {
            query = this.addBoolFilters(query, familyAndFilters, familyNotFilters);
        }

        return query;
    }

    ES.prototype.convertMarkersFilter = function(markers) {
        if (markers == null || markers.length == 0)
            return markers;

        // input structure: [ { "value": [ "A", "B" ] }, { "value": [ "C" ] } ]
        // should be transformed to: [ [ "A", "B" ], [ "C" ] ]

        var newMarkers = [];
        for (var i = 0; i < markers.length; i++) {
            newMarkers.push( markers[i].value );
        }
        return newMarkers;
    }

    ES.prototype.addBoolFilters = function(query, andFilters, notFilters) {
        var boolFilters = {};
        if (andFilters.length > 0) {
            boolFilters["must"] = andFilters;
        }
        if (notFilters.length > 0) {
            boolFilters["must_not"] = notFilters;
        }

        return {"bool": {
            "must": query,
            "filter": { "bool": boolFilters }
        }};
    }

    ES.prototype.buildAggregations = function(searchRequest, from, size) {
        var labels = [];
        for (var label in searchRequest.markerQueries) {
            labels.push(label);
        }

        var from = from || 0;
        var size = size || 1;
        var aggs = { "NestedHitsFacetPlugin": {
            "nestedHits": {
                "groupingField": "publications.famn",
                "fields": searchRequest.fields,
                "labels": labels,
                //"bucket": is set below
                "dejavu": stringifyFamn(searchRequest.dejavu),
                "numItemsPerGroup": searchRequest.itemsPerGroup,
                "numHits": size,
                "startOffset": from
            }
        }};
        if (searchRequest.user != null && searchRequest.user.length > 0) {
            aggs.NestedHitsFacetPlugin.nestedHits["user"] = searchRequest.user;
        }

        if (searchRequest.bucket != null) {
            // set this property only if bucket is defined,
            // since there is a difference between an empty array and undefined array
            aggs.NestedHitsFacetPlugin.nestedHits["bucket"] = searchRequest.bucket;
        }

        if (searchRequest.highlighting.length > 0) {
            var nestedHits = aggs.NestedHitsFacetPlugin.nestedHits;
            nestedHits["highlight"] = {"fields": {}};
            for (var h in searchRequest.highlighting) {
                var hsource = searchRequest.highlighting[h];
                nestedHits["highlight"]["fields"][hsource.field] = {
                    "fragment_size": hsource.fragment_size,
                    "fragment_words_number": hsource.fragment_words_number,
                    "number_of_fragments": hsource.number_of_fragments,
                    "hits_only": hsource.hits_only
                };
            }
            nestedHits["highlight"]["name"] = searchRequest.highlighterName;
        }

        for (var name in searchRequest.widgets) {
            var widget = searchRequest.widgets[name];
            if (name == "scores") {
                aggs["scores"] = {"scoreDistribution": {
                    "min": widget.min || 0,
                    "max": widget.max || 10,
                    "steps": widget.steps || 100
                }};
            } else if (name == "top-scores") {
                aggs["top-scores"] = {"top-scores": {"length": widget.length || 100, "field": widget.field}};
            } else if (name == "dates") {
                aggs["dates"] = {"priorityDate": {"applicationPriorityDate": widget["prio-date"], "applicationFilingDate": widget["filing-date"]}};
            } else if (name == "pubdates") {
                aggs["pubdates"] = {"range": {"field": WIDGET_FIELD_MAPPING["pubdates"], "ranges": widget["ranges"]}};
            } else { // all other aggregations are handled in a standard way: {"terms": { "field": widgetName, "size": widget.size}}
                var agg = createTermsWidget(name, widget);
                if (agg != null) {
                    aggs[name] = agg;
                }
            }
        }

        return aggs;
    }

    ES.prototype.pickValue = function(flag, trueValue, falseValue) {
        if (flag == true) {
            return trueValue;
        } else {
            return falseValue;
        }
    }

    ES.prototype.doRequest = function(path, request, searchRequest, func) {
        var that = this;
        var requestCallback = function(data, status, statusText, rawResponse) {
            var searchResponse = new SearchResponse();
            searchResponse.requestString = JSON.stringify(request); // nice to have for debugging
            searchResponse.loadFromSearchResult(data, searchRequest, statusText);

            if (typeof func === 'function') {
                func(searchResponse, status, statusText);
            } else {
                that.callback(searchResponse, status, statusText);
            }
        };

        this.ajaxRequest(path, "POST", request, requestCallback, requestCallback, searchRequest.asynch, true);
    }

    function createTermsWidget(widgetName, widget) {
        var size = widget.size;
        if (widgetName in WIDGET_FIELD_MAPPING) {
            var fieldName = WIDGET_FIELD_MAPPING[widgetName];
            var snippet = null;
            if (widget.weighted == true) {
                snippet = {"wterms": {"field": fieldName, "size": widget.size}};
            } else {
                snippet = {"terms": {"field": fieldName, "size": widget.size, "execution_hint":"map"}};
            }

            return snippet;
        } else {
            // console.log("Unsupported widget type: " + widgetName);
            return null;
        }
    }

    /**
     *  Takes structure [{"value": ["X", "Y"]}, {"value": ["Z"]}] and produced filter (X or Y) and Z
     *
     *  type: name (type) of the filter, e.g. "cpc"
     *  filter: array of filters with alternatives, e.g. [{"value": ["H01", "H02"]}, {"value": ["C02"]}]
     *  resultAndFilters: list of result filters, which will be AND-ed for the request
     *  method: function which creates single term filter
     **/
    ES.prototype.createEsFilter = function(type, filter, resultAndFilters, resultNotFilters, pubAndFilters, pubNotFilters, method) {
        for (var i in filter) {
            if (typeof filter[i].value != 'undefined') {
                var orFilter = {"bool": {"should": []}};
                //for (var j in filter[i].value) {
                    //var terms = method(type, filter[i].value[j], filter);
                    var terms = method(type, filter[i].value, filter);
                    if (terms != null) {
                        if (terms instanceof Array) {
                            for (var n in terms) {
                                orFilter.bool.should.push(terms[n]);
                            }
                        } else {
                            orFilter.bool.should.push(terms);
                        }
                    }
                //}
                var op = "and";
                if (typeof filter[i].op != 'undefined') {
                    op = filter[i].op;
                }
                var filtersAndArray = resultAndFilters;
                var filtersNotArray = resultNotFilters;
                if (PUBLICATION_FILTERS_MAPPING[type] != undefined) {
                    filtersAndArray = pubAndFilters;
                    filtersNotArray = pubNotFilters;
                }
                if (op == "and") {
                    filtersAndArray.push(orFilter);
                } else if (op == "not") {
                    filtersNotArray.push(orFilter);
                } else {
                    console.log("Wrong filter operator: " + op + ", adding as AND");
                }
            } else {
                 // it's ok e.g. for dates filter
                //console.log("Wrong filter format: " + filter);
            }
        }
    }

    function createSimpleTermFilter(filterType, filterValues, filter) {
        if (filterType in WIDGET_FIELD_MAPPING) {
            // family-level filter
            var fieldName = WIDGET_FIELD_MAPPING[filterType];
            if (filterType in PUBLICATION_FILTERS_MAPPING) {
                // actually publication-level filter
                fieldName = PUBLICATION_FILTERS_MAPPING[filterType];
            }
            if (filterValues instanceof Array) {
                // handle multiple values
                var snippet = {"terms": {}};
                snippet["terms"][fieldName] = new Array();
                for (var i in filterValues) {
                    snippet["terms"][fieldName].push(filterValues[i]);
                }
                return snippet;
            } else {
                // handle single value
                var snippet = {"term": {}};
                snippet["term"][fieldName] = filterValue;
                return snippet;
            }
        } else {
            console.log("Unsupported filter type: " + filterType);
            return null;
        }
    }

    function createLangTermFilter(filterType, filterValues, filter) {
        if (filterType in WIDGET_FIELD_MAPPING) {
            // family-level filter
            var fieldName = WIDGET_FIELD_MAPPING[filterType];
            if (filterType in PUBLICATION_FILTERS_MAPPING) {
                // actually publication-level filter
                fieldName = PUBLICATION_FILTERS_MAPPING[filterType];
            }
            var result = [];
            for (var i in filterValues) {
                var allValues = getLangsStrings(filterValues[i]);
                var snippet = {"terms": {}};
                snippet["terms"][fieldName] = new Array();
                for (var str in allValues) {
                    //var snippet = {"term": {}};
                    snippet["terms"][fieldName].push(str);
                    //item.push(snippet);
                }
                result.push(snippet);
            }
            return result;
        } else {
            console.log("Unsupported filter type: " + filterType);
            return null;
        }
    }

    function createPublicationDatesFilter(filterType, filterValue, filter) {
        var result = [];
        for (var i in filterValue) {
            var item = {};
            item[WIDGET_FIELD_MAPPING[filterType]] = {"gte": filterValue[i]["from"], "lt": filterValue[i]["to"]}; // to
            result.push({"range": item});
        }
        return result;

        //var result = {};
        //result[WIDGET_FIELD_MAPPING[filterType]] = {"gte": filterValue["from"], "lt": filterValue["to"]}; // to
        //return {"range": result};
    }

    function createIndividualDatesFilter(filterType, filterValues, filter) {
        var result = [];
        for (var i in filterValues) {
            var prioDate = filter[filter.length-1]["dates"]["prio-date"];
            var filingDate = filter[filter.length-1]["dates"]["filing-date"];
            var in_time = {"range": {"opubd_full": {"lt": prioDate}}}; // to

            /*
             * Based on section 9.2.4 - 9.2.6 of the guidelines ANY document can be P (even XP !),
             * provided it complies with:
             * AP_PRI <= DOC_PD < AP_FILING_DATE
             */
            var is_p = {"range": {"opubd_full": {"gte": prioDate, "lt": filingDate}}};

            /*
             * Based on section 9.2.4 - 9.2.6 of the guidelines only EP and WO can be E,
             * provided they comply with:
             * (DOC_PRI <= AP_FILING_DATE or DOC_FILING_DATE <= AP_FILING_DATE)
             * and
             * (DOC_PD >= AP_FILING_DATE)
             * and
             * DOC_PRI_DOC != AP_PRI_DOC
             */
            var is_e = {"bool": {
                                "must": [
                                    // FIXME: check all the conditions "within one publication" instead of using values across all publications of a family
                                    {"terms": {"cc": ["ep", "wo"]}},
                                    {"range": {"oprid_full": {"lte": filingDate}}},
                                    {"range": {"opubd_full": {"gte": filingDate}}}
                                ]
                            }};

            var missing_opubd  = {"missing": {"field": "opubd_full"}};
            var missing_oprid =  {"missing": {"field": "oprid_full"}};

            if (filterValues[i] == "in-time") {
                //return in_time;
                result.push({"bool":{"should": [in_time], "must_not": [missing_oprid]}});
            } else if (filterValues[i] == "p-or-e") {
                result.push({"bool":{"should": [is_p, is_e]}}); // "must_not": [missing_opubd, missing_oprid]
            } else if (filterValues[i] == "late") {
                result.push({"not": {"bool": {"should": [in_time, is_p, is_e, missing_opubd, missing_oprid]}}});
            } else if (filterValues[i] == "unknown") {
                result.push({"bool": {"should": [missing_opubd, missing_oprid]}});
            } else {
                console.log("Unsupported value for filter 'dates': " + filterValue);
            }
        }

        return result;
    }

    ES.prototype.createFigureQuery = function(searchRequest) {
        var query = this.createMarkersQuery(searchRequest, "figure_query");
        var positions = [];
        var labels = query["figure_query"]["labels"];
        for (var label in labels) {
            var l = searchRequest.markerPositions[labels[label]] || [];
            positions.push(l);
        }
        query["figure_query"]["positions"] = positions;
        // use new (doc values based) approach
        query["figure_query"]["doc_values_field"] = "publications.figures.positions";
        query = {
                    "function_score" : {
                        "query": query,
                        //"script_score": {
                        //    "script": "doc['publications.figures.reliability'].value"
                        //}
                        "field_value_factor": {
                            "field": "publications.figures.reliability",
                            "factor": 1,
                            "modifier": "none"

                        }
                    }
                };

        return query;
    }

    ES.prototype.createMarkersQuery = function(searchRequest, queryName) {
        var name = queryName || "pql_query_string";
        var labels = [];
        var queries = [];
        for (var label in searchRequest.markerQueries) {
            labels.push(label);
            queries.push(searchRequest.markerQueries[label]);
        }

        var result = {};
        result[name] = {"markers": queries,
                        "labels": labels};

        // so far only marker query is supported, let's look into figure query later
        if (name === "pql_query_string") {
            result[name]["cache"] = searchRequest.cache;
        }

        return result;
    }

    ES.prototype.createNestedQuery = function(innerQuery, path) {
        return {"nested": {
                   "path": path,
                   "score_mode": "max",
                   "query": innerQuery
               }};
    }

    ES.prototype.highlightText = function(text, markerQueries, field, strictField, func, user, asynch) {
        this.highlight(text, null, markerQueries, field, strictField, user, func, asynch);
    }

    ES.prototype.highlightUrl = function(url, markerQueries, field, strictField, func, user, asynch) {
        this.highlight(null, url, markerQueries, field, strictField, user, func, asynch);
    }

    ES.prototype.highlightMulti = function(fields, markerQueries, user, callback) {
        var request = {
            "_fields": fields
        };

        if (user && typeof user !== 'undefined') {
            request["_user"] = user;
        }

        var markers = Object.keys(markerQueries);
        for (var i = 0; i < markers.length; i++) {
            request[markers[i]] = markerQueries[markers[i]];
        }

        this.ajaxRequest("_exthighlight", "POST", request, callback, callback, true);
    }

    ES.prototype.highlight = function(text, url, markerQueries, field, strictField, user, func, asynch) {
        field = field || "publications.desc_en";
        strictField = strictField || "yes";
        var request = {"_field": field, "_strictField": strictField};
        if (url == null && text == null) {
            // console.log("Both url and text are empty.");
            request["_text"] = "";
        } else {
            if (text != null) {
                request["_text"] = text;
            } else if (url != null) {
                request["_url"] = url;
            }
        }

        for (var label in markerQueries) {
            request[label] = markerQueries[label];
        }

        if (typeof user != 'undefined' && user != null && user.length > 0) {
            request["_user"] = user;
        }
        this.ajaxRequest("_exthighlight", "POST", request, func, func, asynch);
    }

    ES.prototype.pqlToJson = function(query, func, user, asynch) {
        var request = {"_query": query};
        if (typeof user != 'undefined' && user != null && user.length > 0) {
            request["_user"] = user;
        }
        var that = this;
        var success = function(data, status, textStatus) {
            // at the moment it might be an escaped json string, turn it into json manually
            // data.response = JSON.parse(data.response);
            if (typeof data.response == 'string' || data.response instanceof String) {
                data.response = JSON.parse(data.response.replace(/[\r\n]+/g, ' '));
            }
            if (typeof func === 'function') {
                func(data, status, textStatus);
            } else {
                that.callback(data, status, textStatus);
            }
        };
        this.ajaxRequest("_pql-json", "POST", request, success, func, asynch);
        //$.ajax(jsonRequest);
    }

    ES.prototype.checkSynonym = function(syn, func, asynch) {
        var request = {"_synonym": syn};

        var that = this;
        var success = function(data, status, textStatus) {
            // response variable is always empty
            data.response = {};
            if (typeof func === 'function') {
                func(data, status, textStatus);
            } else {
                that.callback(data, status, textStatus);
            }
        };
        this.ajaxRequest("_pql-json", "POST", request, success, func, asynch);
        //$.ajax(jsonRequest);
    }

    /////////////////////////////
    ////////// utilities ////////
    /////////////////////////////

    function compareArrays(arr1, arr2) {
        if (!arr1 || !arr2 || (arr1.length != arr2.length)) {
            return false;
        }
        for (var i = 0; i < arr2.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }

        return true;
    }

    function stringsToArrays(obj, delimiter) {
        if (typeof obj == 'undefined') {
            return obj;
        }
        for (var i in obj) {
            obj[i] = stringToArray(obj[i], delimiter);
        }

        return obj;
    }

    function stringToArray(values, delimiter) {
        if (typeof values == 'undefined') {
            return values;
        }
        if (values instanceof Array) {
            return values;
        }
        var pos = values.indexOf(delimiter);
        if (pos == -1) {
            return [values];
        }
        var result = [];
        var leftover = values;
        while (pos > 0) {
           result.push(leftover.substring(0, pos));
           leftover = leftover.substring(pos + 1);

           pos = leftover.indexOf(delimiter);
        }

        result.push(leftover);

        return result;
    }

    /**
     * Calculates Java-like 32-bit hash code of a string
     */
    function hashCode(s) {
        var hash = 0, i, chr;
        if (s.length == 0) return hash;
        for (i = 0; i < s.length; i++) {
            chr = s.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    var ALL_LANG_STRINGS = {
            "de": ["de----", "deen--", "de--fr", "deenfr"],
            "en": ["--en--", "deen--", "--enfr", "deenfr"],
            "fr": ["----fr", "--enfr", "de--fr", "deenfr"],
            "": ["------"]
    };

    /**
     * Returns hash set with all the tokens initialised for the languages.
     */
    function getLangsStrings(langs) {
        var result = {};
        var input = [];
        if (langs instanceof Array) {
            input = langs;
        } else {
            input.push(langs);
        }

        for (var i in input) {
            var allStrings = ALL_LANG_STRINGS[input[i].toLowerCase()];
            for (var j in allStrings) {
                result[allStrings[j]] = true;
            }
        }

        return result;
    }

    function beautifyFiTerms(fis) {
        var result = new Array();
            for (var i in fis) {
            result.push(beautifyFiTerm(fis[i]));
        }
        return result;
    }

    function beautifyFiTerm(fi) {
        // FI usually comes from KIME with an extra digit in front
        if (isNumeric(fi.charAt(0))) {
            fi = fi.substring(1);
        }
        fi = fi.replace(':', '/');
        // since FI classes are "improved" IPC, we can apply default handling
        return formatDefault(fi);
    }

    function formatDefault(value) {
        value = value.trim();
        var C12N_PATTERN = /^([A-Za-z])\s*([0-9]{1,2})([A-Za-z])\s*([0-9]{1,4})\s*[\/,:](\d+)(?:(?:&|\s+)(\d*\s*[A-Za-z]?))?/g;
        var r = handleMatch(value, C12N_PATTERN);
        if (r != "") {
            return r;
        }
        var SHORT_C12N_PATTERN = /^([A-Za-z])\s*([0-9]{1,2})([A-Za-z])\s*(.*)/g;
        r = handleMatch(value, SHORT_C12N_PATTERN);
        return r;
    }

    function handleMatch(str, regexp) {
        var result = "";
        var m = regexp.exec(str);
        if (m !== null) {
            if (m.index === regexp.lastIndex) {
                regexp.lastIndex++;
            }
            for (var i in m) {
                if (i > 0 && m[i] != undefined) {
                    var match = m[i];
                    if (i >= 5) {
                        // remove spaces from tail parts
                        match = match.replace(/ /g, '');
                    }
                    // special separators between some groups
                    if (i == 5) {
                        result = result + '/';
                    } else if (i == 6) {
                        result = result + '&';
                    }

                    result = result + match;
                }
            }
        }
        return result;
    }

    function isNumeric(input) {
        return (input - 0) == input && (''+input).trim().length > 0;
    }


    function stringifyFamn(famn) {
        if (famn && typeof famn !== 'undefined') {
            if (famn instanceof Array) {
                // convert all the elements
                for (var i = 0; i < famn.length; i++) {
                    famn[i] = stringifyFamn(famn[i]);
                }
            }
            else if (isNumeric(famn)) {
                // convert to string and pad with leading zeros
                famn = '' + famn;
                if (famn.length < 9) {
                    famn = new Array(9 - famn.length + 1).join('0') + famn;
                }
            }
            else {
                // family is a string - make sure it's in upper case
                return famn.toUpperCase();
            }
        }

        return famn;
    }


    function enrichBiblio(biblio) {
        var wpiAbstracts = {};

        var applications = Object.keys(biblio);
        for (var i = 0; i < applications.length; i++) {
            if (applications[i] !== 'priority') {
                var appBiblio = biblio[applications[i]];
                enrichApplicationBiblio(appBiblio);

                if (appBiblio.hasOwnProperty("wpi_abs_en") && appBiblio.hasOwnProperty("wpi_an")) {
                    collectWpiAbstracts(appBiblio, wpiAbstracts);
                }
            }
        }

        // add WPI abstract to any application that does not have it
        for (var j = 0; j < applications.length; j++) {
            if (applications[j] !== 'priority') {
                var appBiblio = biblio[applications[j]];
                if (appBiblio.hasOwnProperty("wpi_an") && !appBiblio.hasOwnProperty("wpi_abs_en")) {
                    populateWpiAbstracts(appBiblio, wpiAbstracts);
                }
            }
        }
    }

    function collectWpiAbstracts(appBiblio, wpiAbstracts) {
        // map the kind codes to the abstracts
        var abstracts = {};
        // [ "A1,B2", "C3" ]
        var kcAbs = Object.keys(appBiblio["wpi_abs_en"]);
        for (var i = 0; i < kcAbs.length; i++) {
            var abs = appBiblio["wpi_abs_en"][kcAbs[i]];
            // [ "A1", "B2" ]
            var kcs = kcAbs[i].split(',');
            for (var k = 0; k < kcs.length; k++) {
                abstracts[kcs[k]] = abs;
            }
        }

        // [ "A1", "B2,C3" ]
        var kcFamn = Object.keys(appBiblio["wpi_an"]);
        for (var j = 0; j < kcFamn.length; j++) {
            var famns = appBiblio["wpi_an"][kcFamn[j]];
            // [ "B2", "C3" ]
            var kcs = kcFamn[j].split(',');
            for (var k = 0; k < kcs.length; k++) {
                // find abstract with the same kind code
                var abs = abstracts[kcs[k]];
                // store it for each WPI famn
                if (abs) {
                    for (var f = 0; f < famns.length; f++) {
                        wpiAbstracts[famns[f]] = unique(wpiAbstracts[famns[f]], abs);
                    }
                }
            }
        }
    }

    function populateWpiAbstracts(appBiblio, wpiAbstracts) {
        // [ "A1,B2", "C3" ]
        var kcFamn = Object.keys(appBiblio["wpi_an"]);
        for (var i = 0; i < kcFamn.length; i++) {
            var abstracts = [];
            // collect abstracts for all families
            var famns = appBiblio["wpi_an"][kcFamn[i]];
            for (var f = 0; f < famns.length; f++) {
                var abs = wpiAbstracts[famns[f]];
                if (abs) {
                    abstracts = unique(abstracts, abs);
                }
            }
            if (abstracts.length > 0) {
                if (!appBiblio["wpi_abs_en"]) {
                    appBiblio["wpi_abs_en"] = {};
                }
                appBiblio["wpi_abs_en"][kcFamn] = abstracts;
            }
        }
    }

    function unique(arr1, arr2) {
        if (!arr1) {
            return arr2;
        }
        if (!arr2) {
            return arr1;
        }

        var result = arr1;
        for (var i = 0; i < arr2.length; i++) {
            var contains = false;
            for (var j = 0; j < arr1.length; j++) {
                if (arr1[j] == arr2[i]) {
                    contains = true;
                    break;
                }
            }
            if (!contains) {
                result.push(arr2[i]);
            }
        }
        return result;
    }

    function enrichApplicationBiblio(appBiblio) {
        var allKindCodes = {};
        var hasWPI = false;

        var properties = Object.keys(appBiblio);
        for (var i = 0; i < properties.length; i++) {
            var prop = properties[i];
            if (!hasWPI && prop.indexOf('wpi_') === 0) {
                hasWPI = true;
                // TODO: also check for "WPI-xx" kind codes ???
            }

            // "filing date" is a special property, without kind codes inside
//            if (prop !== 'fd') {
            if (typeof appBiblio[prop] == 'object') {
                var kindCodes = Object.keys(appBiblio[prop]);
                for (var j = 0; j < kindCodes.length; j++) {
                    var kcs = kindCodes[j].split(',');
                    for (var k = 0; k < kcs.length; k++) {
                        allKindCodes[kcs[k]] = true;
                    }
                }
            }
        }

        appBiblio.allKindCodes = Object.keys(allKindCodes);
        appBiblio.allKindCodes.sort();
        appBiblio.hasWPI = hasWPI;
    }

    /**
     * Decompresses array of drawing links or single drawing link
     * Returns array of decompressed drawing links with leading slashes
     */
    function decompressDrawings(drawings) {
        var decompressedValues = [];
        if (drawings instanceof Array) {
            for (var i = 0; i < drawings.length; i++) {
                decompressedValues = decompressedValues.concat(decompressDrawingsLink(drawings[i]));
            }
        } else if (typeof drawings == 'string' || drawings instanceof String) {
            decompressedValues = decompressDrawingsLink(drawings);
        } else {
            throw new Exception("Unknown argument type, it must be array or string");
        }
        return decompressedValues;
    }

    /**
     * Decompresses mixed ('ranged' + 'simple') link to drawings (e.g. WO9744822A1/25..28, 30, 34, 36..38)
     * Returns array of decompressed drawing links with leading slashes (e.g. /WO9744822A1/25, ... , /WO9744822A1/28, /WO9744822A1/30, /WO9744822A1/34, ...)
     */
    function decompressDrawingsLink(str) {
        var decompressedValues = [];
        var regexp = /^(\w+)\/((?:\d+|\d+\.\.\d+)(?:,(?:\d+|\d+\.\.\d+))*)$/;
        var match = regexp.exec(str);
        //first check whether it is 'valid' compressed link
        if (match !== null && match.length == 3) {
            var bnsId = match[1];
            var compressedStr = match[2];
            var compressedValues = compressedStr.split(",");
            regexp = /^(\d+)\.\.(\d+)$/;
            for (var i = 0; i < compressedValues.length; i++) {
                try {
                    match = regexp.exec(compressedValues[i]);
                    if(match !== null && match.length == 3) {
                        decompressedValues = decompressedValues.concat(decompressDrawingsRange(bnsId, parseInt(match[1]), parseInt(match[2])));
                    } else {
                        decompressedValues.push("/" + bnsId + "/" + compressedValues[i]);
                    }
                } catch (e) {
                    console.log(e.message);
                }
            }
        } else {
            //unknown link format, push it as is
            decompressedValues.push(str);
        }
        return decompressedValues;
    }

    /**
     * Decompresses 'ranged' link to drawings (e.g. WO9744822A1/25..28)
     * Returns array of decompressed drawing links with leading slashes (e.g. /WO9744822A1/25, /WO9744822A1/26, ... , /WO9744822A1/28)
     */
    function decompressDrawingsRange(bnsId, start, end) {
        var decompressedValues = [];
        if (start > end) {
            throw new Exception("The start value [" + start + "] is bigger than end value [" + end + "]");
        }
        while (start <= end){
            decompressedValues.push("/" + bnsId + "/" + start);
            start++;
        }
        return decompressedValues;
    }

    function Exception(message){
        this.message = message;
    }


/* Exports for Node environment */
if (typeof module === 'object' && module.hasOwnProperty('exports')) {
  module.exports = {
    ES: ES,
    SearchRequest: SearchRequest,
    SearchResponse: SearchResponse,
    beautifyFiTerm: beautifyFiTerm,
    beautifyFiTerms: beautifyFiTerms,
    stringifyFamn: stringifyFamn,
    enrichBiblio: enrichBiblio,
    enrichApplicationBiblio: enrichApplicationBiblio,
    decompressDrawings: decompressDrawings,
    decompressDrawingsLink: decompressDrawingsLink,
    decompressDrawingsRange: decompressDrawingsRange
  };
}
