import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import htmlToText from 'react-html-parser'

const BlogPost = ({ post }) => {
  return (
    <Link to={`${post._id}`}>
      <Card className="rounded my-3 p-3 productCard mb-3">
        <Card.Text as='h4' className='productText' style={{ color: 'green' }}>
        </Card.Text>
        <Card.Img src={post.image.location} variant='top' />
        <Card.Body>
          <Card.Title as='div'><strong>{post.title}</strong></Card.Title>
          <Card.Text as='h5'>
            {htmlToText(post.text.slice(0, 100))}
            <h6>Read More...</h6>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  )
};

export default BlogPost;
