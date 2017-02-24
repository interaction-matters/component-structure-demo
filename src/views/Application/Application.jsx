import React from 'react';
import SplitPane from 'react-split-pane';

import styles from './Application.scss'

const Application = props => {
  return <div className={styles.application} style={{display: 'flex', width: '100%', height: '100%', position: 'relative'}}>
  <SplitPane split="vertical" defaultSize="50%">
    <div style={{flex: 1}}>
      <div className={styles.actions}>
        <span className={styles.title}>Patent Application</span>
      </div>
      <div className={styles.viewer} style={{padding: '3em'}}>
        <h3>Claims</h3>
        1. A method of making a pizza comprising the following steps: combining a quantity of cheese with a plurality of pizza toppings selected from the group consisting of sliced meats, ground meats, and vegetables, as well as combinations thereof, into a layer on a surface, said layer being appropriately shaped to be placed on a pizza shell; fusing and quantity of cheese and pizza toppings to thereby form a toppings disk; storing said toppings disk for subsequent use; providing a pizza shell; assembling said pizza toppings disk and said pizza shell to form an uncooked pizza; and baking said uncooked pizza.
        <br /><br />
        2. The method of claim 1 wherein said quantity of cheese comprises shredded cheese.
        <br /><br />
        3. The method of claim 1 wherein said quantity of cheese comprises sliced cheese.
        <br /><br />
        4.The method of claim 1 wherein said quantity of cheese and said plurality of pizza toppings are fused together by softening said quantity of cheese and resolidifying said quantity of cheese.
        <br /><br />
        5. The method of claim 1 wherein said quantity of cheese and said pizza toppings are fused together by a food safe adhesive.
        <br /><br />
        6. The method of claim 1 wherein the said toppings disk is refrigerated without being frozen during storage.
        <br /><br />
        7. The method of claim 1 wherein said toppings disk is frozen during storage.
        <br /><br />
        8. The method of claim 1 wherein pizza sauce is applied between the toppings disk and the shell.
        <br /><br />
        9. The method of claim 1 wherein the quantity of cheese and the pizza toppings are fused together by thermally softening and resolidifying the quantity of cheese.
        <br /><br />
        10. The method of claim 1 wherein the toppings disk does not include pizza sauce.
        <br /><br />
        11. A method of making a pizza comprising the following steps: `forming a first quantity of cheese into a layer of cheese on a surface, said layer being appropriately shaped to be placed on top of a pizza shell; applying to said first layer of cheese a plurality of pizza toppings selected form the group consisting of sliced meats, ground meats, and vegetables, as well as combinations thereof; applying a second quantity of cheese on top of said first quantity of cheese and said pizza toppings; fusing said quantities of cheese and pizza toppings to thereby form a toppings disk; storing said toppings disk for subsequent use; providing a pizza shell; assembling said pizza toppings disk and said pizza shell to form an uncooked pizza; and baking said uncooked pizza.
        <br /><br />
        12. The method of claim 11 further comprising the steps of: combining a third quantity of cheese with said plurality of pizza toppings prior to applying said plurality of pizza toppings to said first layer of cheese.
        <br /><br />
        13. The method of claim 11 wherein said quantities of cheese comprise shredded cheese.
        <br /><br />
        14. A method of making pizzas for a plurality of pizza outlets comprising the following steps: at a central location, combining quantities of cheese with pluralities of pizza toppings selected from the group consisting of sliced meats, ground meats, and vegetables, as well as combinations thereof, into layers on a surface, said layers being appropriately shaped to be placed on pizza shells; fusing said quantities of cheese and pizza toppings to thereby form toppings disks; refrigerating said toppings disks; shipping said toppings disks to said plurality of pizza outlets; at each of said pizza outlets, providing pizza shells; assembling said pizza toppings disks and said pizza shells to form uncooked pizzas; and baking said uncooked pizzas.
      </div>
    </div>
    <div style={{flex: 1, borderLeft: '1px solid #ddd'}}>
      <div className={styles.actions}>
        <span className={styles.title}>&nbsp;</span>
      </div>
      <div className={styles.viewer} style={{padding: '3em'}}>
        <h3>Biblio</h3>
        <h4 className='title'>Method of making pizza with a pizza toppings disk</h4>
        <table className='biblio-table biblio-collapsed'><tbody><tr><td id='ws1-biblio1-td-1' className='biblio-label'>Application number</td><td id='ws1-biblio1-td-2'>EP 04024654 </td></tr><tr><td id='ws1-biblio1-td-3' className='biblio-label'>Filing date</td><td id='ws1-biblio1-td-4'><span className='date appdate'>15-10-2004</span></td></tr><tr><td id='ws1-biblio1-td-5' className='biblio-label'>Priority numbers</td><td id='ws1-biblio1-td-6'><div><ul><li id='ws1-biblio1-li-1'>US 512247.P &nbsp;<span className='dateHolder'>(<span className='date'>17-10-2003</span>)</span></li><li id='ws1-biblio1-li-2'>US 740154.A &nbsp;<span className='dateHolder'>(<span className='date'>18-12-2003</span>)</span></li></ul></div></td></tr><tr className='biblio-less-more'><td id='ws1-biblio1-td-7' className='biblio-label'>classifications</td><td id='ws1-biblio1-td-8'><div><dl className='classifications'><dt id='ws1-biblio1-dt-1'>prec</dt><dd id='ws1-biblio1-dd-1'><span className='classNameTT'>A61F2/46</span></dd><dt id='ws1-biblio1-dt-2'>ipcr</dt><dd id='ws1-biblio1-dd-2'><span className='fixmeIPCR'>A61F2/46, A61F2/40, A61B17/17, A61F2/30</span></dd></dl><dl className='classNameifications' /></div></td></tr><tr className='biblio-less-more'><td id='ws1-biblio1-td-9' className='biblio-label'>Inventors</td><td id='ws1-biblio1-td-10'><div><ul className='biblio-application-persons'><li id='ws1-biblio1-li-3'>Bigliani, Louis U., M.D. (US)</li><li id='ws1-biblio1-li-4'>Kelly, Ian (GB)</li><li id='ws1-biblio1-li-5'>Flatow, Evan, M.D. (US)</li><li id='ws1-biblio1-li-6'>Wiley, Roy C. (US)</li><li id='ws1-biblio1-li-7'>Miniaci, Anthony, M.D. (CA)</li><li id='ws1-biblio1-li-8'>Durand-Allen, Anitra (US)</li><li id='ws1-biblio1-li-9'>Nicholson, Gregory, M.D. (US)</li><li id='ws1-biblio1-li-10'>McCluskey, George, M.D. (US)</li><li id='ws1-biblio1-li-11'>Yamaguchi, Ken, M.D. (US)</li><li id='ws1-biblio1-li-12'>Pearl, Michael, M.D. (US)</li></ul></div></td></tr><tr><td id='ws1-biblio1-td-11' className='biblio-label'>Applicants</td><td id='ws1-biblio1-td-12'><div><ul className='biblio-application-persons'><li id='ws1-biblio1-li-13'>Zimmer Technology, Inc. (US)</li></ul></div></td></tr></tbody></table>
      </div>
    </div>
  </SplitPane>
  </div>
}

export default Application;
