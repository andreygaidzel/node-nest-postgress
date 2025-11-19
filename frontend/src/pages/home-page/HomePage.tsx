import HomePageBody from '@/pages/home-page/home-page-body/HomePageBody.tsx';

function HomePage() {

  return (
    <div className='simple-page'>
      <div className='simple-page__header'>
        <h1 className='page-name'>Home Page</h1>
      </div>

      <div className='simple-page__content'>
        <HomePageBody />
      </div>
    </div>
  );
}

export default HomePage;
