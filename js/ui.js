class UIHandler {
  constructor() {
    this.elements = {}
    this.elements.toggle_white = this.sel('#checkbox-white')
    this.elements.toggle_black = this.sel('#checkbox-black')

    this.elements.strength_white = this.sel('#strength-white')
    this.elements.strength_black = this.sel('#strength-black')

    this.elements.restart_button = this.sel('#button_restart')

    this.elements.toggle_white_starts = this.sel('#toggle-white_starts')
    this.elements.toggle_draw_reps = this.sel('#toggle-draw_reps')
    this.elements.toggle_draw_moves = this.sel('#toggle-draw_moves')

    this.updateOnStart()
    this.bindEvents()
  }

  updateOnStart() {
    // PLAYER SETTINGS
    this.elements.toggle_white.checked = GAME_OPTIONS.playerWhiteEngine
    this.elements.toggle_black.checked = GAME_OPTIONS.playerBlackEngine

    if(!this.elements.toggle_white.checked) {
      this.elements.strength_white.readOnly = true
    } else {
      this.elements.strength_white.readOnly = false
    }

    if(!this.elements.toggle_black.checked) {
      this.elements.strength_black.readOnly = true
    } else {
      this.elements.strength_black.readOnly = false
    }

    this.elements.strength_white.value = GAME_OPTIONS.playerWhiteStrength
    this.elements.strength_black.value = GAME_OPTIONS.playerBlackStrength

    // GAME RULES
    this.elements.toggle_white_starts.checked = GAME_OPTIONS.whiteBegins
    this.elements.toggle_draw_reps.checked = DRAW_BY_REPETITION
    this.elements.toggle_draw_moves.checked = DRAW_BY_50_MOVES
  }

  bindEvents() {
    // PLAYER SETTINGS
    this.listen(this.elements.toggle_white, 'change', (e) => {
      GAME_OPTIONS.playerWhiteEngine = this.elements.toggle_white.checked

      if(!this.elements.toggle_white.checked) {
        this.elements.strength_white.readOnly = true
      } else {
        this.elements.strength_white.readOnly = false
      }
    })

    this.listen(this.elements.toggle_black, 'change', (e) => {
      GAME_OPTIONS.playerBlackEngine = this.elements.toggle_black.checked

      if(!this.elements.toggle_black.checked) {
        this.elements.strength_black.readOnly = true
      } else {
        this.elements.strength_black.readOnly = false
      }
    })

    this.listen(this.elements.strength_white, 'change', (e) => {
      // Check if input is legal
      if(this.elements.strength_white.value < 1) {
        this.elements.strength_white.value = 1
      } else if(this.elements.strength_white.value > 5) {
        this.elements.strength_white.value = 5
      }

      GAME_OPTIONS.playerWhiteStrength = this.elements.strength_white.value
    })

    this.listen(this.elements.strength_black, 'change', (e) => {
      // Check if input is legal
      if(this.elements.strength_black.value < 1) {
        this.elements.strength_black.value = 1
      } else if(this.elements.strength_black.value > 5) {
        this.elements.strength_black.value = 5
      }

      GAME_OPTIONS.playerBlackStrength = this.elements.strength_black.value
    })

    this.listen(this.elements.restart_button, 'click', (e) => {
      call_after_dom_update(() => {
        game.restart()
      })
    })


    // GAME RULES
    this.listen(this.elements.toggle_white_starts, 'change', (e) => {
      GAME_OPTIONS.whiteBegins = this.elements.toggle_white_starts.checked
    })

    this.listen(this.elements.toggle_draw_reps, 'change', (e) => {
      DRAW_BY_REPETITION = this.elements.toggle_draw_reps.checked
    })

    this.listen(this.elements.toggle_draw_moves, 'change', (e) => {
      DRAW_BY_50_MOVES = this.elements.toggle_draw_moves.checked
    })
  }

  sel(s) {
    return document.querySelector(s)
  }

  listen(el, action, cb) {
    el.addEventListener(action, cb)
  }
}

const ui = new UIHandler()
