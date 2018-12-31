const fetchPageData = (store, route, asyncComponents) => {
  return Promise.all(
    asyncComponents.map(asyncComponent =>
      asyncComponent.asyncData({ store, route })
    )
  );
};

export default fetchPageData;
