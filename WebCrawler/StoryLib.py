__author__ = 'Pratik'
import sys
from bs4 import BeautifulSoup
import urllib as url
from Story import Story
from HTMLParser import HTMLParser

class StoryLib:

    # parse the HTML or XML to get description and return story object
    def getStroy(self, title, pubDate, link, authorId, agencyId):
        try:
            description = ""
            originalLink = ""
            rcpHandle = url.urlopen(link)
            rcpPageData = rcpHandle.read()
            rcpBeautyPage = BeautifulSoup(rcpPageData, "html.parser")

            articleData = rcpBeautyPage.find(id="article_body")
            if not articleData == None:
                for article in articleData.find_all('p'):
                    description = description + (article.get_text().encode("utf8")) + "<br />"

                articleOuterLinkDiv = rcpBeautyPage.find(id="article_source_link")
                if not articleOuterLinkDiv == None:
                    for child in articleOuterLinkDiv.children:
                        if len(child) > 0:
                            originalLink = (child.get('href'))
            else:
                articleData = rcpBeautyPage.find(id="alpha")
                # new design support
                if articleData == None:
                    articleData = rcpBeautyPage.find_all("div", class_="entry-body-text")

                    if len(articleData) > 0:
                        for article in articleData[0].find_all('p'):
                            description = description + (article.get_text().encode("utf8")) + "<br />"

                            articleOuterLinkDiv = rcpBeautyPage.find(id="article_source_link")
                            if not articleOuterLinkDiv == None:
                                for child in articleOuterLinkDiv.children:
                                    if len(child) > 0:
                                        originalLink = (child.get('href'))
                            else:
                                articleOuterLinkDiv = rcpBeautyPage.find_all("span", class_="more-link")
                                if len(articleOuterLinkDiv) > 0:
                                    for linka in articleOuterLinkDiv[0].find_all('a'):
                                        originalLink = linka.get('href')
                    else:
                        articleData = rcpBeautyPage.find_all("div", class_="article-body-text")

                        if len(articleData) > 0:
                            for article in articleData[0].find_all('p'):
                                description = description + (article.get_text().encode("utf8")) + "<br />"

                                articleOuterLinkDiv = rcpBeautyPage.find(id="article_source_link")
                                if not articleOuterLinkDiv == None:
                                    for child in articleOuterLinkDiv.children:
                                        if len(child) > 0:
                                            originalLink = (child.get('href'))
                                else:
                                    articleOuterLinkDiv = rcpBeautyPage.find_all("span", class_="more-link")
                                    if len(articleOuterLinkDiv) > 0:
                                        for linka in articleOuterLinkDiv[0].find_all('a'):
                                            originalLink = linka.get('href')

                else:
                    # old design support
                    if not articleData == None:
                        for article in articleData.find_all('p'):
                            description = description + (article.get_text().encode("utf8")) + "<br />"

                            articleOuterLinkDiv = rcpBeautyPage.find(id="article_source_link")
                            if not articleOuterLinkDiv == None:
                                for child in articleOuterLinkDiv.children:
                                    if len(child) > 0:
                                        originalLink = (child.get('href'))
                            else:
                                articleOuterLinkDiv = rcpBeautyPage.find_all("span", class_="more-link")
                                if len(articleOuterLinkDiv) > 0:
                                    for linka in articleOuterLinkDiv[0].find_all('a'):
                                        originalLink = linka[0].get('href')

            parser = HTMLParser()
            story = Story(0, title, pubDate, parser.unescape(description), link, originalLink, authorId, agencyId)
            return story
        except:
            e = sys.exc_info()[0]
            print "ERROR : getStroy : {0}".format(e)

    # check whether story exist or not
    def storyExist(self, story, connection):
        try:
            cursor = connection.cursor()
            select = "SELECT count(*) from Item WHERE Title='{0}' AND PubDate='{1}' AND Link='{2}' AND OriginalLink='{3}'".format(
                story.title, story.pubDate, story.link, story.originalLink)
            cursor.execute(select)
            counter = cursor.fetchone()

            if counter[0] == 0:
                return False
            else:
                return True
        except:
            e = sys.exc_info()[0]
            print "ERROR : storyExist : {0}".format(e)

    # insert story into database
    def insertStory(self, story, connection):
        try:
            cursor = connection.cursor()

            if not self.storyExist(story, connection):
                insert = "INSERT INTO Item (PubDate,Description,Link,OriginalLink,AuthorId,Title,AgencyId) VALUES ('{0}','{1}','{2}', '{3}',{4},'{5}','{6}')".format(
                    story.pubDate, story.description, story.link, story.originalLink, story.authorId, story.title,
                    story.agencyId)
                cursor.execute(insert)
                connection.commit()
        except:
            e = sys.exc_info()[0]
            print "ERROR : insertStory : {0}".format(e)
