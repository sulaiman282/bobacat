import React from 'react';
import Head from 'next/head';
import Theme1Layout from '@/components/themes/Theme1Layout';

export default function Theme1() {
  return (
    <>
      <Head>
        <title>BOBA CAT - Cosmic Theme</title>
        <meta name="description" content="BOBA CAT - Cosmic 3D Experience" />
      </Head>
      <Theme1Layout />
    </>
  );
}