import { Menu as MenuIcon } from '@mui/icons-material'
import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material'
import React, { useState } from 'react'
import { Sidebar } from '../Sidebar'
import * as styles from './style.module.scss'
import { StaticImage } from 'gatsby-plugin-image'
import { Link, navigate } from 'gatsby'

export const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <AppBar position='fixed' className={styles.AppBar}>
      {/*on small screens show side bar only when menu icon is clicked*/}
      {isSidebarOpen && (
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      )}

      <Toolbar className={styles.toolbar}>
        <IconButton
          size='large'
          edge='start'
          aria-label='menu'
          sx={{
            display: {
              md: 'none'
            }
          }}
          onClick={() => {
            setIsSidebarOpen((prev) => !prev)
          }}
        >
          <MenuIcon />
        </IconButton>

        <StaticImage
          src='../../images/logo.png'
          alt='Logo'
          placeholder='blurred'
          layout='fixed'
          width={160}
          height={60}
          onClick={() => navigate('/#home')}
        />

        <Box
          className={styles.links}
          sx={{
            display: {
              xs: 'none',
              md: 'flex'
            }
          }}
        >
          <NavigationLink label='Home' link='/#home' />
          <NavigationLink label='Calculator' link='/taxCalculator' />
          <NavigationLink label='News' link='/news' showStar />
        </Box>

        <Box className={styles.rightSideBox}>
          <Button variant='contained' onClick={() => navigate('/#contactUs')}>
            Contact Us
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

type NavigationLinkProps = {
  label: string
  link: string
  showStar?: boolean
}

export const NavigationLink = ({
  label,
  link,
  showStar
}: NavigationLinkProps) => {
  return (
    <Link to={link} className={styles.link}>
      {label}
      {showStar && <span className={styles.star}>★</span>}
    </Link>
  )
}
