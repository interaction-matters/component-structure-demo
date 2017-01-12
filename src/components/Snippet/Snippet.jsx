import React, { Component, PropTypes } from 'react';

import styles from './Snippet.scss';

class Snippet extends Component {
	render() {
		return (
			<article className={styles.root}>
				<header className={styles.snippetHeader}>
					{/* checkbox, indicators, meta */}
					<input className={styles.familySelector} name="family-checkbox" title="Add document to selection" value="on" type="checkbox" />
					{/* Indicators */}
					<div className={styles.indicators}>
						<div data-type="timeliness" data-status="in-time">
							<div data-type="ranking">3</div>
							<div data-type="status-name">in time</div>
							<div className={styles.expander} title="Expand/collapse result list item"></div>
						</div>
					</div>
					{/* meta */}
					<div className={styles.meta}>
						<div className={styles.head}>
							<h2 className={styles.title} title="Open family">
								<a href="#" title="Open US2009112329A1: Humeral Head Preserving Implant">Humeral head preserving implant</a>
								<span className={styles.signature}>
									<span>A</span>
									<span>B</span>
								</span>
								<span className={styles.score}>78.226</span>
							</h2>
						</div>
						<dl>
							<dd data-type="lang">EN</dd>
							<dt><abbr title="Cooperative Patent Classification">CPC</abbr></dt>
							<dd>A61B17/7233</dd>
							<dd>A61B17/72</dd>
							<dd data-type="classes-count"><abbr title="A61B17/7266"></abbr></dd>
							<dt><abbr title="Representative Publication">Rep. Publication</abbr></dt>
							<dd><a href="#" title="Open US7476253B1: Humeral head preserving implant">US7476253B1</a></dd>
							<dt><abbr title="Oldest priority date of the family">Old. Prio. Date</abbr></dt>
							<dd>2004-08-11</dd>
							<dt><abbr title="Oldest publication date of the family">Old. Pub. Date</abbr></dt>
							<dd>2009-01-13</dd>
							<dt><abbr title="Number of pages in publication">Pages</abbr></dt>
							<dd>16</dd>
							<dt>Inventors</dt>
							<dd><abbr title="WARREN RUSSELL F, WINSLOW NATHAN A, CRAIG EDWARD V, WARREN RUSSELL"></abbr></dd>
							<dt>Applicants</dt>
							<dd><abbr title="BIOMET MFG CORP"></abbr></dd>
						</dl>
					</div>
				</header>
				<section className={styles.snippetContent}>
					{/* publication, excerpts - abs/clms/desc/wpi, images */}
					
				</section>
			</article>
		)
	}
}

export default Snippet;