import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Header from 'components/common/Header'
import DatagramMenu from 'components/common/DatagramMenu'
import Subheader from 'components/common/Subheader';
import { actions } from 'store'
import {getTranslates} from 'utils/getTranslate'
import './layout.scss'

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
const Layout = (props) => {
  const { 
    children, 
    getProfileAction, 
    getFiltersAndCategoriesAction, 
    getContextualFilterAction, 
    location: { pathname }, 
    profile, 
    menuOpened, 
    toggleMenu,
    selectedFilter,
    changeCalendarRange,
    changeCalendarRange2,
    setPageTitleKey
  } = props
  const [title, setTitle] = useState('')

  
  const TRANSLATES = getTranslates(profile.locale);
  const PAGE = pathname.replace('/', '') === 'viewability' ? 'view' : pathname.replace('/', '')
  const PAGENAME = TRANSLATES.menu.menuItem[PAGE] 
  const HEADERTITLE = PAGENAME ? PAGENAME : title
  
  useEffect(() => {
    if(pathname === '/'){
      setTitle('Dashboard')
      setPageTitleKey('home')
    }
    Object.keys(TITLE_OBJ).forEach(item => {
      if(pathname.includes(item)){
        setPageTitleKey(item)
        setTitle(TITLE_OBJ[item])
      }
    })
  },[pathname, TRANSLATES, setPageTitleKey])
  
  useEffect(() => {
    getFiltersAndCategoriesAction()
    getProfileAction()
    getContextualFilterAction()
  },[getFiltersAndCategoriesAction, getProfileAction, getContextualFilterAction])
  
 
  return (
    <div>
      <Header 
        translates={TRANSLATES}
        title={HEADERTITLE}
        profile={profile}
        selectedFilter={selectedFilter}
        changeCalendarRange={changeCalendarRange}
        changeCalendarRange2={changeCalendarRange2}
      />
      <Subheader
        translates={TRANSLATES}
        title={title}
        {...props}
      />
      <DatagramMenu menu={TRANSLATES.menu} profile={profile} open={menuOpened} toogleOpen={() => toggleMenu(!menuOpened)}/>

      <div className='core-layout__viewport' style={{ paddingLeft: menuOpened ? 220 : 70 }}> 
        <div className='sub-container'>
          {children}
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = store => ({
  profile: store.app.profile,
  menuOpened: store.app.menuOpened,
  selectedFilter: store.app.selectedFilter
})

const mapDispatchToProps = dispatch => ({
  getProfileAction: () => dispatch(actions.app.getProfileAction()),
  getFiltersAndCategoriesAction: () => dispatch(actions.app.getFiltersAndCategoriesAction()),
  getContextualFilterAction: () => dispatch(actions.app.getContextualFilterAction()),
  toggleMenu: (opened) => dispatch(actions.app.toggleMenu(opened)),
  changeCalendarRange: (data) => dispatch(actions.app.changeCalendarRange(data)),
  changeCalendarRange2: (data) => dispatch(actions.app.changeCalendarRange2(data)),
  selectFilter: (newSelectedFilter) => dispatch(actions.app.selectFilter(newSelectedFilter)),
  setActiveTrees: (activeTrees) => dispatch(actions.app.setActiveTrees(activeTrees)),
  getSubheaderPageData: (title, selectedFilter) => dispatch(actions.app.getSubheaderPageData(title, selectedFilter)),
  setRequestId: (data) => dispatch(actions.app.setRequestId(data)),
  setPageTitleKey: (data) => dispatch(actions.app.setPageTitleKey(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout))

