module.exports = nextApp => async (req, res) => {
  const { stepname } = req.params;
  const {
    query: { step = 'index' },
  } = req;

  nextApp.render(req, res, '/become-a-host', {
    step: stepname || step,
    pageName: 'become-a-host',
  });
};
