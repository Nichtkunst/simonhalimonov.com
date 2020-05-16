import React from "react"
import { Box, Grid } from "theme-ui"
import Image, { FluidObject } from "gatsby-image"

import SEO from "../../components/SEO"
import HTML from "../../components/HTML/HTML"

import { PageTitleAnimation } from "../../components/Layout/PageTitleAnimation"

import { ContentWithSidebar } from "../../components/Layouts/ContentWithSidebar"

import H from "../../components/Typography/H"

import { Page } from "../../contracts/page"
import { Preview } from "../../contracts/preview"

import { decodeHtmlCharCodes } from "../../utils"

export interface Props {
  pageContext: {
    previous: {
      slug: string
      title: string
      path: string
    }
    next: {
      slug: string
      title: string
      path: string
    }
    page: {
      node: Page | Preview
    }
    lang: string
  }
  location: Location
}

export const DefaultPage = (props: Props) => {
  const pageContext = props?.pageContext
  const page = pageContext?.page?.node
  const lang = pageContext?.lang

  const fluid: FluidObject | null =
    page?.featured_media?.localFile?.childImageSharp?.fluid || null

  const title = page?.title || page?.post_title

  const excerpt = page?.excerpt || page?.post_excerpt

  const content = page?.content || page?.post_content

  return (
    <>
      <SEO
        title={decodeHtmlCharCodes(title)}
        description={excerpt}
        lang={lang}
      />

      <PageTitleAnimation>{decodeHtmlCharCodes(title)}</PageTitleAnimation>

      <ContentWithSidebar>
        <Grid
          as="article"
          sx={{ p: [3, 4], pb: [4, 5], gridColumn: ["1/13", "1/13", "1/10"] }}
          gap={[3, 4, 5]}
          columns={[4]}
        >
          <Box
            sx={{
              maxWidth: ["100%", "800px"],
              mx: "auto",
              px: [0, 0, 0, 3],
              gridColumn: ["1/5", "2/4"],
            }}
          >
            <H as="h1">{decodeHtmlCharCodes(title)}</H>
          </Box>
          {fluid && fluid?.src?.length > 0 && (
            <Box sx={{ my: [2, 3], gridColumn: ["1/5", "1/5"] }}>
              <Image fluid={fluid} alt={title} title={title} />
            </Box>
          )}

          <Grid
            sx={{ gridColumn: ["1/5", "1/5"], position: "relative" }}
            gap={[3, 4, 5]}
            columns={[4]}
          >
            <HTML html={content} />
          </Grid>
        </Grid>
      </ContentWithSidebar>
    </>
  )
}

export default DefaultPage
