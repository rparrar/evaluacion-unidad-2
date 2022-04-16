class PageController {
  renderAbout (req, res) {
    res.render('about', {
      about : 1
    })
  }

  renderAboutSystem (req, res) {
    res.render('about-system', {
      aboutsystem : 1
    })
  }

  renderNotFound (req, res) {
    res.render('404')
  }
}

module.exports = PageController
