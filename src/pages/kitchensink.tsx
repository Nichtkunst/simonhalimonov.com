import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Image, { FluidObject } from "gatsby-image"
import { Box, Grid } from "theme-ui"

import SEO from "../components/SEO"

import SocialSidebar from "../components/SocialSidebar/SocialSidebar"

import H from "../components/Typography/H"

import HTML from "../components/HTML/HTML"

import { ChildImageSharp } from "../contracts/post"
import { Page } from "../contracts/page"
import { Preview } from "../contracts/preview"

export interface Props {
  data: {
    file: ChildImageSharp
  }
  location: Location
}

export default () => {
  const {
    wordpressPage,
  }: {
    wordpressPage: Page | Preview
  } = useStaticQuery(graphql`
    query {
      wordpressPage(slug: { eq: "kitchensink" }) {
        id
        content
        slug
        title
        type
        excerpt
        date
        status
        featured_media {
          localFile {
            childImageSharp {
              fluid(quality: 85) {
                aspectRatio
                src
                srcSet
                sizes
                base64
                tracedSVG
                srcWebp
                srcSetWebp
              }
            }
          }
        }
      }
    }
  `)

  const fluid: FluidObject | null =
    wordpressPage?.featured_media?.localFile?.childImageSharp?.fluid || null

  const title = wordpressPage?.title?.rendered || wordpressPage?.post_title

  const content =
    wordpressPage?.content?.rendered || wordpressPage?.post_content

  const [layout, setLayout] = React.useState<"default" | "fullwidth">("default")

  if (layout === "fullwidth") {
    return (
      <>
        <SEO title="Kitchensink" />
        <Grid sx={{ p: [3, 4], pt: [8, 8] }} gap={[3, 4, 5]} columns={[1]}>
          <Box>
            {fluid && fluid?.src?.length > 0 && (
              <Box
                sx={{
                  width: "100%",
                  mb: [2, 4],
                  "& img": { objectFit: "cover" },
                }}
              >
                <Image fluid={fluid} alt={title} title={title} />
              </Box>
            )}
            <Box>
              <H onClick={() => setLayout("default")} sx={{ mb: [2, 4] }}>
                ↳ Click to view Layout with Sidebar 👀
              </H>
            </Box>

            <HTML html={content} />
          </Box>
        </Grid>
      </>
    )
  }

  // `default` layout
  return (
    <>
      <SEO title="Kitchensink" />
      <Grid sx={{ px: [3, 4], pt: [6, 7, 8] }} gap={[3, 4, 5]} columns={[12]}>
        <Box sx={{ gridColumn: ["1/13", "1/10"] }}>
          <Box sx={{ maxWidth: "70ch", mx: "auto" }}>
            <H onClick={() => setLayout("fullwidth")}>
              ↳ Click to view Layout with Fullwidth 👀
            </H>
          </Box>

          {fluid && fluid?.src?.length > 0 && (
            <Box
              sx={{
                width: "100%",
                mb: [2, 4],
                "& img": { objectFit: "cover" },
              }}
            >
              <Image fluid={fluid} alt={title} title={title} />
            </Box>
          )}

          <HTML html={content} />
        </Box>

        <Box sx={{ gridColumn: ["1/13", "10/13"] }}>
          <SocialSidebar />
        </Box>
      </Grid>
    </>
  )
}
