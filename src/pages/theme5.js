import React from 'react';
import Head from 'next/head';
import Theme5Layout from '@/components/themes/Theme5Layout';

export default function Theme5() {
  return (
    <>
      <Head>
        <title>BOBA - Retro Wave Theme</title>
        <meta name="description" content="BOBA - Retro Wave Design" />
      </Head>
      <Theme5Layout />
    </>
  );
}