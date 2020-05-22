import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Header from 'components/common/Header'
import DatagramMenu from 'components/common/DatagramMenu'
import { actions } from 'store'
import {getTranslates} from 'utils/getTranslate'

import './layout.scss'

const Layout = (props) => {
  const {children, getProfileAction, location: { pathname }, profile, menuOpened, toggleMenu} = props
  const [title, setTitle] = useState('')

  const TITLE_OBJ = {
    assortment: 'Assortiments',
    report: 'Reportings',
    price: 'Prix',
    promotion: 'Promotions',
    ean: 'EAN',
    product: 'Produits',
    view: 'Visibilité',
    media: 'Media',
    rating: 'Notes & Avis',
    geolocation: 'Magasins',
    sales: 'Ventes',
    search: 'Recherche',
    gallerie: 'Modules Analytics',
    pim: 'PIM',
  }
  const TRANSLATES = getTranslates(profile.locale);
  const PAGE = pathname.replace('/', '') === 'viewability' ? 'view' : pathname.replace('/', '')
  const PAGENAME = TRANSLATES.menu.menuItem[PAGE] 
  const HEADERTITLE = PAGENAME ? PAGENAME : title
  
  useEffect(() => {
    if(pathname === '/') setTitle('Dashboard')
    Object.keys(TITLE_OBJ).forEach(item => {
      if(pathname.includes(item)){
        setTitle(TITLE_OBJ[item])
      }
    })
  },[TITLE_OBJ, pathname, TRANSLATES])
  
  useEffect(() => {
    getProfileAction()
  },[getProfileAction])
  
 
  return (
    <div>
      <Header title={HEADERTITLE}/>
      <DatagramMenu menu={TRANSLATES.menu} profile={profile} open={menuOpened} toogleOpen={() => toggleMenu(!menuOpened)}/>
      <div className='core-layout__viewport' style={{ paddingLeft: menuOpened ? 220 : 70 }}> 
        {children}
      </div>
    </div>
  )
}

const mapStateToProps = store => ({
  profile: store.app.profile,
  menuOpened: store.app.menuOpened
})

const mapDispatchToProps = dispatch => ({
  getProfileAction: () => dispatch(actions.app.getProfileAction()),
  toggleMenu: (opened) => dispatch(actions.app.toggleMenu(opened))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout))
