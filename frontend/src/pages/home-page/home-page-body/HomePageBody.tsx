import React from 'react';
import { useFetchPostsQuery } from '@/services/PostService.ts';
import { baseUrl, DEFAULT_PAGE } from '@/shared/constants/baseConfig.ts';
import { SORT_ORDERS } from '@/models/IFetchTableParams.ts';
import Loader from '@/components/shared/loader/Loader.tsx';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import type { IFetchResult } from '@/components/shared/table/TableView.model.ts';
import type { IPost } from '@/models/IPost.ts';
import styles from './HomePageBody.module.scss';

const gridSize = { sm: 12, md: 4 };

const HomePageBody: React.FC = () => {
  const fetchResult: IFetchResult<IPost> = useFetchPostsQuery({
    page: DEFAULT_PAGE,
    pageSize: 6,
    sort: {
      field: 'createdAt',
      order: SORT_ORDERS.ASC
    },
    filter: {},
  });

  if (fetchResult.isLoading) {
    return <Loader/>;
  }

  if ('error' in fetchResult) {
    return <h3>Some error {JSON.stringify(fetchResult.error)}</h3>
  }

  if ('data' in fetchResult) {
    return (
      <Grid
        container
        spacing={2}
        className="grid-container"
      >
        {
          fetchResult.data.data.map((post) => (
            <Grid
              size={gridSize}
              key={post.id}
              className="grid-item">
              <Card className={styles.postCard}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={`${baseUrl}/${post.image}`}
                />
                <CardContent className={styles.postContent}>
                  <Typography
                    className={styles.postTitle}
                    gutterBottom variant="h5"
                    component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" className={styles.postDescription}>
                    {post.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Read More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    );
  }
}

export default HomePageBody;