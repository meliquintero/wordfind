const findChallenges = async user => {
  const response = await fetch(`/find_challenges`);
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);

  return body;
};

export {findChallenges}
