export const groupFixtures = (fixtures) => {
  return fixtures.reduce((acc, curr) => {
    if (Object.keys(acc).includes(curr.stage.starting_at)) {
      acc[curr.stage.starting_at].push(curr);
    } else {
      acc[curr.stage.starting_at] = [];
      acc[curr.stage.starting_at].push(curr);
    }
    return acc;
  }, {});
};
