class PageController {
  renderAbout (req, res) {
    res.render('about', {
      title: 'ACERCA DE...',
      about: 1
    })
  }

  renderAboutSystem (req, res) {
    res.render('about-system', {
      title: 'ACERCA DEL SISTEMA',
      aboutsystem: 1
    })
  }

  renderNotFound (req, res) {
    res.render('404', {
      title: 'NO ENCONTRADO!'
    })
  }
}

module.exports = PageController
