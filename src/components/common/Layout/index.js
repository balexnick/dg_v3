import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom";
import Header from 'components/Header'
import DatagramMenu from 'components/DatagramMenu'
import { actions } from 'store'

const Layout = (props) => {
  const {children, getProfileAction, location: { pathname } } = props
  const [title, setTitle] = useState('')

  const title_obj = {
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

  useEffect(() => {
    if(pathname === '/') setTitle('Dashboard')
    Object.keys(title_obj).forEach(item => {
      if(pathname.includes(item)){
        setTitle(title_obj[item])
      }
    })
  },[title_obj, pathname])
  
  useEffect(() => {
    getProfileAction()
  },[getProfileAction])

  return (
    <div>
      <Header title={title}/>
      <DatagramMenu/>
      {children}
    </div>
  )
}

const mapStateToProps = store => ({})

const mapDispatchToProps = dispatch => ({
  getProfileAction: () => dispatch(actions.profile.getProfileAction())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout))
