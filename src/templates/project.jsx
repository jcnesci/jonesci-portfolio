import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import styled from "@emotion/styled"
import colors from "styles/colors"
import dimensions from "styles/dimensions"
import { Link, graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import Button from "components/_ui/Button"
import Layout from "components/Layout"

const ProjectHeroContainer = styled("div")`
  background: ${colors.grey200};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  position: relative;
  padding-top: 2.25em;
  margin-bottom: 3.5em;

  img {
    max-width: 600px;
  }
`

const ProjectTitle = styled("div")`
  max-width: 550px;
  margin: 0 auto;
  text-align: center;
`

const ProjectLinkContainer = styled("div")`
  padding-bottom: 1em;
`

const ProjectLink = styled("a")`
  font-weight: 600;
  text-decoration: none;
  color: currentColor;
  transition: all 150ms ease-in-out;

  span {
    margin-left: 1em;
    transform: translateX(-8px);
    display: inline-block;
    transition: transform 400ms ease-in-out;
  }

  //NB: hack to reset styles after linked opened in new tab
  &:focus,
  &:focus:hover {
    color: currentColor;

    span {
      transform: translateX(-8px);
    }
  }

  &:hover {
    color: ${colors.joTeal};
    transition: all 150ms ease-in-out;

    span {
      transform: translateX(0px);
      opacity: 1;
      transition: transform 150ms ease-in-out;
    }
  }
`

const ProjectAboutContainer = styled("div")`
  padding-top: 1em;
  padding-bottom: 3em;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 1.5em;

  @media (max-width: ${dimensions.maxwidthMobile}px) {
    padding-bottom: 1em;
  }

  > div:nth-of-type(1),
  > div:nth-of-type(2) {
    padding-top: 2em;
    border-top: 1px solid rgb(230, 230, 230);
  }
  > div:nth-of-type(odd) {
    font-weight: 600;
  }
`

const ProjectBody = styled("div")`
  max-width: 550px;
  margin: 0 auto;

  .block-img {
    margin-top: 3.5em;
    margin-bottom: 0.5em;

    img {
      width: 100%;
    }
  }

  // For embedded media in body text, like Youtube, etc.
  iframe {
    width: 550px;
    height: 310px;
    margin-top: 1em;
    margin-bottom: 1em;
  }
`

const WorkLink = styled(Link)`
  margin-top: 3em;
  display: block;
  text-align: center;
`

const Project = ({ project, meta }) => {
  return (
    <>
      <Helmet
        title={`${project.project_title[0].text}`}
        titleTemplate={`%s | ${meta.title}`}
        meta={[
          {
            name: `description`,
            content: meta.description,
          },
          {
            property: `og:title`,
            content: `${project.project_title[0].text}`,
          },
          {
            property: `og:description`,
            content: meta.description,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            name: `twitter:card`,
            content: `summary`,
          },
          {
            name: `twitter:creator`,
            content: meta.author,
          },
          {
            name: `twitter:title`,
            content: meta.title,
          },
          {
            name: `twitter:description`,
            content: meta.description,
          },
        ].concat(meta)}
      />
      <Layout>
        <ProjectTitle>{RichText.render(project.project_title)}</ProjectTitle>
        {project.project_hero_image && (
          <ProjectHeroContainer>
            <img src={project.project_hero_image.url} alt="hero" />
          </ProjectHeroContainer>
        )}
        <ProjectBody>
          {project.project_link.url && (
            <ProjectLinkContainer>
              <ProjectLink
                href={project.project_link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Project Link
                <span>&#8594;</span>
              </ProjectLink>
            </ProjectLinkContainer>
          )}
          {RichText.render(project.project_description)}
          <ProjectAboutContainer>
            <div>Company</div>
            <div>{RichText.asText(project.project_company)}</div>
            <div>Roles</div>
            <div>{RichText.asText(project.project_roles)}</div>
          </ProjectAboutContainer>
          <WorkLink to={"/work"}>
            <Button className="Button--secondary">See other work</Button>
          </WorkLink>
        </ProjectBody>
      </Layout>
    </>
  )
}

export default ({ data }) => {
  const projectContent = data.prismic.allProjects.edges[0].node
  const meta = data.site.siteMetadata
  return <Project project={projectContent} meta={meta} />
}

Project.propTypes = {
  project: PropTypes.object.isRequired,
}

export const query = graphql`
  query ProjectQuery($uid: String) {
    prismic {
      allProjects(uid: $uid) {
        edges {
          node {
            project_title
            project_preview_description
            project_preview_thumbnail
            project_category
            project_post_date
            project_hero_image
            project_description
            project_link {
              ... on PRISMIC__ExternalLink {
                _linkType
                url
              }
            }
            project_company
            project_roles
            _meta {
              uid
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
