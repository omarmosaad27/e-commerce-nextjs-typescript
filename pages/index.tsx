import type { NextPage } from 'next';
import {Container,Grid} from '@mui/material'
import  CardItem  from '../components/Card';
import Layout from '../components/Layout';
import { useGlobalContext } from '../context/context';
import { useState } from 'react';
const Home: NextPage = () => {
      const { products } = useGlobalContext();

  return (
    <Layout title={'home page'}>
      <Container sx={{paddingTop:'2rem'}}>
        <Grid
          container
          spacing={4}
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          {products.map(
            (product: {
              id: any;
              title: string;
              category: string;
              image: string;
              price: any;
              rating: { rate: any; count: any };
              description: string;
            }): JSX.Element => {
              const {
                id,
              } = product;
              return <CardItem {...product} key={id} />;
            }
          )}
        </Grid>
      </Container>
    </Layout>
  );
};

export default Home;
