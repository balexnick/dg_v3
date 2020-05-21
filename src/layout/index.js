import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Header from 'components/common/Header'
import DatagramMenu from 'components/common/DatagramMenu'
import { actions } from 'store'
import {getTranslates} from 'utils/getTranslate'

import './layout.scss'

const Layout = (props) => {
  const {children, getProfileAction, location: { pathname }, profile} = props
  const [title, setTitle] = useState('')

  const TITLE_OBJ = {
    assortment: 'Assortiments',
    report: 'Reportings',
    price: 'Prix',
    promotion: 'Promotions',
    ean: 'EAN',
    product: 'Produits',
    viewability: 'Visibilité',
    media: 'Media',
    rating: 'Notes & Avis',
    geolocation: 'Magasins',
    sales: 'Ventes',
    search: 'Recherche',
    gallerie: 'Modules Analytics',
    pim: 'PIM',
  }
  
  const TRAMSLATES = getTranslates(profile.locale);

  useEffect(() => {
    if(pathname === '/') setTitle('Dashboard')
    Object.keys(TITLE_OBJ).forEach(item => {
      if(pathname.includes(item)){
        setTitle(TITLE_OBJ[item])
      }
    })
  },[TITLE_OBJ, pathname])
  
  useEffect(() => {
    getProfileAction()
  },[getProfileAction])

  return (
    <div>
      <Header title={title}/>
      <DatagramMenu menu={TRAMSLATES.menu} profile={profile}/>
      <div className='core-layout__viewport'>
        {children}
      </div>
    </div>
  )
}

const mapStateToProps = store => ({
  profile: store.app.profile
})

const mapDispatchToProps = dispatch => ({
  getProfileAction: () => dispatch(actions.app.getProfileAction())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout))
