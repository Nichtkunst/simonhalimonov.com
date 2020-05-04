import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Grid, Box, useColorMode } from "theme-ui"
import { Sun, Moon } from "react-feather"
import { motion } from "framer-motion"

import Logo from "../Logo/Logo"
import S from "../Typography/S"

export interface Props {
  location: Location
  lang: string
}

interface MenuNode {
  node: {
    items: {
      object: string
      title: string
      url: string
    }[]
    name: string
  }
}

const MenuItem = ({ title, url }: MenuNode["node"]["items"][0]) => (
  <S>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <Link to={url} title={title}>
        {title}
      </Link>
    </motion.div>
  </S>
)

const normalizeLinks = (links: MenuNode["node"]["items"]) => {
  const normalizedItems = links.map((item) => {
    if (item.object === "custom") {
      return item
    } else {
      try {
        const url = new URL(item.url)
        return { ...item, url: url.pathname }
      } catch (error) {
        return item
      }
    }
  })
  return normalizedItems
}

export const Header = ({ lang }: Props) => {
  // Switching color themes
  const [colorMode, setColorMode] = useColorMode()

  /**
   * Query all menu items and site languages
   */
  const query = useStaticQuery(graphql`
    query {
      allWordpressWpApiMenusMenusItems {
        edges {
          node {
            name
            items {
              title
              url
              object
            }
          }
        }
      }
      site {
        siteMetadata {
          languages {
            default {
              name
              locale
              pathPrefix
            }
            german {
              name
              locale
              pathPrefix
            }
          }
        }
      }
    }
  `)

  const menuEdges = query.allWordpressWpApiMenusMenusItems.edges
  const languages = query.site.siteMetadata.languages

  /**
   * Check if lang is available
   * Otherwise use default as fallback language
   */
  const currentMenuLang = lang || languages.default.locale

  const currentMenuItems: MenuNode["node"]["items"] = menuEdges.filter(
    (edge: MenuNode) => edge.node.name.includes(`[${currentMenuLang}]`)
  )[0].node.items

  // Get the first menu item
  const homepageLink = currentMenuItems[0]

  /**
   * Remove IP/domain of headless WP links
   * Skip the first link with slice
   */
  const normalizedItems = normalizeLinks(currentMenuItems).slice(1)

  return (
    <Grid
      className="header-container"
      sx={{
        p: [3, 4],
        alignItems: "center",
        position: "absolute",
        zIndex: 100,
        width: "100%",
      }}
      columns={[6, 12]}
      gap={[3, 4, 5]}
    >
      <Link to={homepageLink.url} title={homepageLink.title}>
        <Box sx={{ "svg path": { fill: "text" } }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Logo />
          </motion.div>
        </Box>
      </Link>
      {normalizedItems.map((item, index) => (
        <MenuItem key={index} {...item} />
      ))}

      <S
        sx={{
          "&:hover": { opacity: 0.5, cursor: "pointer" },
        }}
        onClick={() => {
          setColorMode(colorMode === "default" ? "dark" : "default")
        }}
      >
        {colorMode === "default" ? (
          <motion.div
            key={"moon"}
            style={{ marginTop: ".35em" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
          >
            <Moon strokeWidth={1} />
          </motion.div>
        ) : (
          <motion.div
            key={"sun"}
            style={{ marginTop: ".35em" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
          >
            <Sun strokeWidth={1} />
          </motion.div>
        )}
      </S>
    </Grid>
  )
}

export default Header
