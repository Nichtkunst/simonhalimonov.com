import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { Flex, Box, Grid } from "theme-ui"

import SEO from "../../components/SEO"

import SocialSidebar from "../../components/SocialSidebar/SocialSidebar"

import H from "../../components/Typography/H"
import P from "../../components/Typography/P"
import S from "../../components/Typography/S"

import BlogPostTeaser from "./BlogPostTeaser"

import { Post, InstagramFeed } from "../../contracts/post"
import { capitalizeFirstLetter } from "../../utils"

export interface Props {
  pathContext: {
    group: { node: Post }[]
    allInstaNode: InstagramFeed
    slug: string
  }
  location: Location
}

export const BlogTagPostsPage = (props: Props) => {
  const { group } = props.pathContext
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)
  return (
    <>
      <SEO
        title={`${site.siteMetadata.title} | ${site.siteMetadata.description}`}
        description={site.siteMetadata.description}
      />
      <Grid
        sx={{ p: [3, 4], pt: [6, 7, 8] }}
        gap={[3, 4, 5]}
        columns={[1, "3fr 1fr"]}
      >
        <Box>
          <Box
            sx={{
              maxWidth: "70ch",
              mx: "auto",
              pb: [3, 4],
              mb: [3, 4],
              border: "1px solid transparent",
              borderBottomColor: "text",
            }}
          >
            <H as="h3">
              Browsing Tag Posts:{" "}
              {capitalizeFirstLetter(props.pathContext.slug)}
            </H>
          </Box>
          {group.map(BlogPostTeaser)}
        </Box>
        <SocialSidebar />
      </Grid>
    </>
  )
}

export default BlogTagPostsPage
