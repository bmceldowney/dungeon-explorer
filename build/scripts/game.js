/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _states = __webpack_require__(1);
	
	var _states2 = _interopRequireDefault(_states);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var width = 643;
	var height = 340;
	var renderer = Phaser.AUTO;
	var parent = 'content';
	var defaultState = null;
	var transparent = false;
	var antialias = false;
	var physicsConfig = null;
	var game = new Phaser.Game(width, height, renderer, parent, defaultState, transparent, antialias, physicsConfig);
	
	_states2.default.loading(game.state);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Gameplay = __webpack_require__(2);
	
	var _Gameplay2 = _interopRequireDefault(_Gameplay);
	
	var _Loading = __webpack_require__(41);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	var _Menu = __webpack_require__(47);
	
	var _Menu2 = _interopRequireDefault(_Menu);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = {
	    loading: function loading(stateManager) {
	        changeState(stateManager, _Loading2.default);
	    },
	
	    menu: function menu(stateManager) {
	        changeState(stateManager, _Menu2.default);
	    },
	
	    gameplay: function gameplay(stateManager) {
	        changeState(stateManager, _Gameplay2.default);
	    }
	};
	
	/**
	* This weird little work-around is here because I wasn't able to import
	* index.js into files in the same directory. Injecting the module via
	* each state's constructor felt OKAY, but I'd love to understand more.
	*/
	function createState(state) {
	    return new state(module.exports);
	}
	
	function changeState(stateManager, state) {
	    if (stateManager.checkState(state.name) != true) {
	        stateManager.add(state.name, createState(state));
	    }
	    stateManager.start(state.name);
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _State3 = __webpack_require__(3);
	
	var _State4 = _interopRequireDefault(_State3);
	
	var _actors = __webpack_require__(4);
	
	var _actors2 = _interopRequireDefault(_actors);
	
	var _levels = __webpack_require__(32);
	
	var _levels2 = _interopRequireDefault(_levels);
	
	var _services = __webpack_require__(11);
	
	var _services2 = _interopRequireDefault(_services);
	
	var _constants = __webpack_require__(7);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _groups = __webpack_require__(35);
	
	var _groups2 = _interopRequireDefault(_groups);
	
	var _items = __webpack_require__(38);
	
	var _items2 = _interopRequireDefault(_items);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Gameplay = function (_State2) {
	    _inherits(Gameplay, _State2);
	
	    function Gameplay() {
	        _classCallCheck(this, Gameplay);
	
	        var _this = _possibleConstructorReturn(this, (Gameplay.__proto__ || Object.getPrototypeOf(Gameplay)).call(this));
	
	        _this.path = [];
	        _this.playerTarget = null;
	        return _this;
	    }
	
	    _createClass(Gameplay, [{
	        key: 'preload',
	        value: function preload() {
	            this.context = _services2.default.context();
	
	            this.level = _levels2.default.getLevel(this.game);
	            this.context.init(this.game);
	        }
	    }, {
	        key: 'create',
	        value: function create() {
	            var _this2 = this;
	
	            var context = this.game.context;
	            this.pathfinding = _services2.default.pathfinding();
	
	            this.level.addMap();
	            console.log(this.level);
	
	            var playerObj = this.level.getPlayerPosition();
	
	            this.player = _actors2.default.player(this.game, playerObj.x, playerObj.y, this.world);
	            this.enemies = _groups2.default.enemies(this.game);
	            this.enemies.initEnemies(this.level.getEnemies());
	
	            this.items = _groups2.default.items(this.game);
	            this.items.initItems(this.level.getItems());
	
	            this.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_LOCKON);
	
	            this.game.input.activePointer.leftButton.onUp.add(this.pointerClicked, this);
	
	            this.pathfinding.loadLevel(this.level);
	            this.scheduling = _services2.default.scheduling();
	
	            this.scheduling.addActor(this.player);
	            this.scheduling.start();
	
	            this.visibility = _services2.default.visibility();
	            this.visibility.update(this.player, this.level);
	
	            this.scheduling.ticked.add(function () {
	                // hide enemies and items that are not in LoS
	                _this2.enemies.forEach(function (enemy) {
	                    var tile = _this2.pathfinding.pointToTile(_this2.pathfinding.getCenteredPosition(enemy));
	                    enemy.renderable = _this2.level.isTileVisible(tile.x, tile.y);
	                });
	
	                _this2.visibility.update(_this2.player, _this2.level);
	                _this2.updateTiles();
	            });
	
	            // this.game.input.mouse.mouseWheelCallback = this.onMouseWheel
	            this.updateTiles();
	        }
	    }, {
	        key: 'onMouseWheel',
	        value: function onMouseWheel(evt) {
	            var wheelDelta = evt.wheelDelta;
	            // console.dir(this.game.input.mouse.wheelDelta)
	            var width = this.game.width + this.game.input.mouse.wheelDelta * 5;
	            var height = width * 0.625;
	            // console.log(`width: ${this.game.canvas.width}`)
	            // console.log(`height: ${this.game.canvas.height}`)
	            this.game.scale.setGameSize(width, height);
	            this.game.scale.refresh();
	            // this.game.world.scale.set(this.game.input.mouse.wheelDelta / 10)
	
	            // console.dir(this.game.world.scale)
	            // const zoomAmount = this.game.input.mouse.wheelDelta / 4
	            //
	            // this.game.camera.scale.x += zoomAmount
	            // this.game.camera.scale.y += zoomAmount
	
	            // this.game.camera.bounds.x = size.x * this.game.camera.scale.x
	            // this.game.camera.bounds.y = size.y * this.game.camera.scale.y
	            // this.game.camera.bounds.width = size.width * this.game.camera.scale.x
	            // this.game.camera.bounds.height = size.height * this.game.camera.scale.y
	            // this.game.camera.bounds.width = this.game.width * this.game.camera.scale.x
	            // this.game.camera.bounds.height = this.game.height * this.game.camera.scale.y
	        }
	    }, {
	        key: 'pointerClicked',
	        value: function pointerClicked(btn) {
	            var _this3 = this;
	
	            var point = new Phaser.Point(Math.floor(btn.parent.worldX), Math.floor(btn.parent.worldY));
	
	            this.pathfinding.findPath(this.pathfinding.getCenteredPosition(this.player), point, function (result) {
	                if (result && result.length) {
	                    _this3.game.context.player.destinationPath = result;
	                }
	            });
	        }
	    }, {
	        key: 'updateTiles',
	        value: function updateTiles() {
	            var _this4 = this;
	
	            this.level.map.layer.data.forEach(function (row) {
	                row.forEach(function (tile) {
	
	                    var point = _this4.pathfinding.tileToPoint({ x: tile.x, y: tile.y });
	
	                    if (tile.properties.visible) {
	                        tile.alpha = 1;
	                    } else if (tile.properties.revealed) {
	                        tile.alpha = 0.35;
	                    } else {
	                        tile.alpha = 0;
	                    }
	                });
	            });
	
	            this.level.map.layer.dirty = true;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var mouseX = Phaser.Math.snapTo(Math.floor(this.game.input.activePointer.worldX - _constants2.default.TILEWIDTH / 2), _constants2.default.TILEWIDTH);
	            var mouseY = Phaser.Math.snapTo(Math.floor(this.game.input.activePointer.worldY - _constants2.default.TILEHEIGHT / 2), _constants2.default.TILEHEIGHT);
	            var worldPos = this.game.world.worldPosition;
	
	            var pixOffsetX = _constants2.default.TILEWIDTH - 2;
	            var pixOffsetY = _constants2.default.TILEHEIGHT - 2;
	            var x = mouseX + worldPos.x;
	            var y = mouseY + worldPos.y;
	
	            this.game.debug.pixel(x, y);
	            this.game.debug.pixel(x + pixOffsetX, y);
	            this.game.debug.pixel(x, y + pixOffsetY);
	            this.game.debug.pixel(x + pixOffsetX, y + pixOffsetY);
	
	            // if (this.path) {
	            //   this.path.forEach(tile => {
	            //     const point = this.pathfinding.tileToPoint(tile)
	            //     this.game.debug.pixel(point.x + worldPos.x, point.y + worldPos.y, '#00FF00', constants.TILEWIDTH)
	            //   })
	            // }
	        }
	    }]);
	
	    return Gameplay;
	}(_State4.default);
	
	exports.default = Gameplay;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _State = function (_Phaser$State) {
	    _inherits(_State, _Phaser$State);
	
	    function _State(stateProvider) {
	        _classCallCheck(this, _State);
	
	        var _this = _possibleConstructorReturn(this, (_State.__proto__ || Object.getPrototypeOf(_State)).call(this));
	
	        _this.stateProvider = stateProvider;
	        return _this;
	    }
	
	    return _State;
	}(Phaser.State);
	
	exports.default = _State;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Player = __webpack_require__(5);
	
	var _Player2 = _interopRequireDefault(_Player);
	
	var _Rat = __webpack_require__(26);
	
	var _Rat2 = _interopRequireDefault(_Rat);
	
	var _sprites = __webpack_require__(27);
	
	var _sprites2 = _interopRequireDefault(_sprites);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = {
	    player: function player(game, x, y) {
	        var group = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
	
	        var sprite = _sprites2.default.player(game, x, y);
	        var player = new _Player2.default(game, sprite);
	
	        if (group) {
	            group.add(player.sprite);
	        }
	
	        return player;
	    },
	
	    rat: function rat(game, x, y) {
	        var group = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
	
	        var sprite = _sprites2.default.rat(game, x, y);
	        var rat = new _Rat2.default(game, sprite);
	
	        if (group) {
	            group.add(rat.sprite);
	        }
	
	        return rat;
	    }
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Actor3 = __webpack_require__(6);
	
	var _Actor4 = _interopRequireDefault(_Actor3);
	
	var _behaviors = __webpack_require__(8);
	
	var _behaviors2 = _interopRequireDefault(_behaviors);
	
	var _services = __webpack_require__(11);
	
	var _services2 = _interopRequireDefault(_services);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Player = function (_Actor2) {
	    _inherits(Player, _Actor2);
	
	    function Player(game, sprite) {
	        _classCallCheck(this, Player);
	
	        return _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, game, sprite, _behaviors2.default.player(game)));
	    }
	
	    _createClass(Player, [{
	        key: '_updatePostion',
	        value: function _updatePostion() {
	            var pathfinder = _services2.default.pathfinding();
	            var playerTile = pathfinder.pointToTile(pathfinder.getCenteredPosition(this));
	            this.game.context.player.position = playerTile;
	        }
	    }]);
	
	    return Player;
	}(_Actor4.default);
	
	exports.default = Player;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _constants = __webpack_require__(7);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MOVE_DURATION = 75;
	var MOVE_DISTANCE = _constants2.default.TILEWIDTH;
	
	var Actor = function () {
	    function Actor(game, sprite, behaviorManager) {
	        var _this = this;
	
	        _classCallCheck(this, Actor);
	
	        this.game = game;
	        this.sprite = sprite;
	        this.behaviorManager = behaviorManager;
	        this.behaviorManager.actor = this;
	
	        this.canMove = true;
	        this.isAlive = true;
	
	        this.sprite.body.onMoveComplete.add(function () {
	            _this.sprite.body.x = Phaser.Math.snapTo(_this.sprite.body.x, _constants2.default.TILEWIDTH);
	            _this.sprite.body.y = Phaser.Math.snapTo(_this.sprite.body.y, _constants2.default.TILEHEIGHT);
	            _this.canMove = true;
	            _this.sprite.animations.play('idle');
	            _this._updatePostion();
	        });
	    }
	
	    _createClass(Actor, [{
	        key: 'kill',
	        value: function kill() {
	            this.sprite.kill();
	            this.isAlive = false;
	        }
	    }, {
	        key: 'move',
	        value: function move(facing, animation) {
	            var promiseResolve = void 0;
	            var promise = new Promise(function (resolve) {
	                return promiseResolve = resolve;
	            });
	
	            if (this.canMove == false) {
	                return promise;
	            }
	
	            if (animation) {
	                this.sprite.animations.play(animation);
	            }
	
	            this.canMove = false;
	            this.sprite.body.onMoveComplete.addOnce(promiseResolve);
	            this.sprite.body.moveTo(MOVE_DURATION, MOVE_DISTANCE, facing);
	
	            return promise;
	        }
	    }, {
	        key: 'attack',
	        value: function attack() {
	            this.sprite.animations.play('attack');
	        }
	    }, {
	        key: 'moveAngle',
	        value: function moveAngle(angle) {
	            if (Math.abs(angle) > 90) {
	                this.sprite.scale.x = 1;
	            } else if (Math.abs(angle) < 90) {
	                this.sprite.scale.x = -1;
	            }
	
	            return this.move(angle, 'walk');
	        }
	    }, {
	        key: 'act',
	        value: function act() {
	            var action = this.behaviorManager.getAction();
	
	            if (action) {
	                return action.execute();
	            } else {
	                return this._waitForInput();
	            }
	        }
	    }, {
	        key: '_waitForInput',
	        value: function _waitForInput() {
	            var _this2 = this;
	
	            var promiseResolve = void 0;
	            var promiseReject = void 0;
	
	            var interval = setInterval(function () {
	                var action = _this2.behaviorManager.getAction();
	
	                if (action) {
	                    clearInterval(interval);
	                    action.execute().then(function (result) {
	                        return promiseResolve(result);
	                    }).catch(function (reason) {
	                        return promiseReject(reason);
	                    });
	                }
	            }, 250);
	
	            return new Promise(function (resolve, reject) {
	                promiseResolve = resolve;
	                promiseReject = reject;
	            });
	        }
	    }, {
	        key: '_updatePostion',
	        value: function _updatePostion() {
	            // noop
	        }
	    }, {
	        key: 'moveSpeed',
	        get: function get() {
	            return 1;
	        }
	    }]);
	
	    return Actor;
	}();
	
	exports.default = Actor;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    TILEWIDTH: 16,
	    TILEHEIGHT: 16,
	    SPRITEKEY: 'spriteKey'
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _PlayerBehaviorManager = __webpack_require__(9);
	
	var _PlayerBehaviorManager2 = _interopRequireDefault(_PlayerBehaviorManager);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    player: function player(game) {
	        return new _PlayerBehaviorManager2.default(game);
	    }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BehaviorManager3 = __webpack_require__(10);
	
	var _BehaviorManager4 = _interopRequireDefault(_BehaviorManager3);
	
	var _services = __webpack_require__(11);
	
	var _services2 = _interopRequireDefault(_services);
	
	var _actions = __webpack_require__(21);
	
	var _actions2 = _interopRequireDefault(_actions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PlayerBehaviorManager = function (_BehaviorManager2) {
	    _inherits(PlayerBehaviorManager, _BehaviorManager2);
	
	    function PlayerBehaviorManager(game) {
	        _classCallCheck(this, PlayerBehaviorManager);
	
	        var _this = _possibleConstructorReturn(this, (PlayerBehaviorManager.__proto__ || Object.getPrototypeOf(PlayerBehaviorManager)).call(this, game));
	
	        _this.pathfinder = _services2.default.pathfinding();
	        return _this;
	    }
	
	    _createClass(PlayerBehaviorManager, [{
	        key: '_getAction',
	        value: function _getAction() {
	            var action = null;
	            var position = Phaser.Point.parse(this.game.context.player.position);
	            var destinationPath = this.game.context.player.destinationPath;
	
	            if (destinationPath.length > 0) {
	                action = _actions2.default.move(this.game, this.actor, { position: position, destinationPath: destinationPath });
	            }
	
	            return action;
	        }
	    }]);
	
	    return PlayerBehaviorManager;
	}(_BehaviorManager4.default);
	
	exports.default = PlayerBehaviorManager;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _BehaviorManager = function () {
	    function _BehaviorManager(game) {
	        _classCallCheck(this, _BehaviorManager);
	
	        this.game = game;
	    }
	
	    _createClass(_BehaviorManager, [{
	        key: 'getAction',
	        value: function getAction() {
	            return this._getAction();
	        }
	    }, {
	        key: '_getAction',
	        value: function _getAction() {
	            console.log('this should never fire');
	        }
	    }]);
	
	    return _BehaviorManager;
	}();
	
	exports.default = _BehaviorManager;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _pathfinding2 = __webpack_require__(12);
	
	var _pathfinding3 = _interopRequireDefault(_pathfinding2);
	
	var _scheduling2 = __webpack_require__(18);
	
	var _scheduling3 = _interopRequireDefault(_scheduling2);
	
	var _gameContext = __webpack_require__(19);
	
	var _gameContext2 = _interopRequireDefault(_gameContext);
	
	var _visibility2 = __webpack_require__(20);
	
	var _visibility3 = _interopRequireDefault(_visibility2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    pathfinding: function pathfinding() {
	        return _pathfinding3.default;
	    },
	    scheduling: function scheduling() {
	        return _scheduling3.default;
	    },
	    context: function context() {
	        return _gameContext2.default;
	    },
	    visibility: function visibility() {
	        return _visibility3.default;
	    }
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _easystarjs = __webpack_require__(13);
	
	var _easystarjs2 = _interopRequireDefault(_easystarjs);
	
	var _constants = __webpack_require__(7);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var easystar = new _easystarjs2.default.js();
	var mapData = [];
	
	easystar.enableDiagonals();
	
	function pointToTile(point) {
	    return new Phaser.Point(Phaser.Math.snapTo(Math.floor(point.x - _constants2.default.TILEWIDTH / 2), _constants2.default.TILEWIDTH) / _constants2.default.TILEWIDTH, Phaser.Math.snapTo(Math.floor(point.y - _constants2.default.TILEHEIGHT / 2), _constants2.default.TILEHEIGHT) / _constants2.default.TILEHEIGHT);
	}
	
	function tileToPoint(point) {
	    return new Phaser.Point(Math.floor(point.x * _constants2.default.TILEWIDTH), Math.floor(point.y * _constants2.default.TILEHEIGHT));
	}
	
	exports.default = {
	    // uses a flood-fill to determine the area of an enclosed space
	    // currently assumes 0 is passable and 1 is blocked
	    // TODO: modify to use the walkables list
	    countContiguousTiles: function countContiguousTiles(playerSprite, gridSize) {
	        var visitedTiles = [];
	        var tileQueue = [];
	        var currentTile = pointToTile(playerSprite.body.position);
	        var tileCount = 1;
	
	        function queueAdjacentTiles(tile) {
	            visitedTiles[tile.y][tile.x] = true;
	
	            if (mapData[tile.y][tile.x - 1] === 0 && !visitedTiles[tile.y][tile.x - 1]) {
	                tileQueue.unshift({ x: tile.x - 1, y: tile.y });
	                visitedTiles[tile.y][tile.x - 1] = true;
	            }
	            if (mapData[tile.y][tile.x + 1] === 0 && !visitedTiles[tile.y][tile.x + 1]) {
	                visitedTiles[tile.y][tile.x + 1] = true;
	                tileQueue.unshift({ x: tile.x + 1, y: tile.y });
	            }
	            if (mapData[tile.y - 1][tile.x] === 0 && !visitedTiles[tile.y - 1][tile.x]) {
	                visitedTiles[tile.y - 1][tile.x] = true;
	                tileQueue.unshift({ x: tile.x, y: tile.y - 1 });
	            }
	            if (mapData[tile.y + 1][tile.x] === 0 && !visitedTiles[tile.y + 1][tile.x]) {
	                tileQueue.unshift({ x: tile.x, y: tile.y + 1 });
	                visitedTiles[tile.y + 1][tile.x] = true;
	            }
	        }
	
	        for (var i = 0; i < mapData.length; i++) {
	            visitedTiles[i] = [];
	        }
	
	        queueAdjacentTiles(currentTile);
	
	        while (tileQueue.length) {
	            console.log('queue length: ' + tileQueue.length);
	            if (mapData[currentTile.y][currentTile.x] === 0) {
	                console.log('x: ' + currentTile.x + ', y: ' + currentTile.y);
	                tileCount++;
	            }
	
	            currentTile = tileQueue.pop();
	            queueAdjacentTiles(currentTile);
	        }
	
	        return tileCount;
	    },
	
	    findPath: function findPath(startPosition, destinationPosition, callback) {
	        var actorTile = pointToTile(startPosition);
	        var targetTile = pointToTile(destinationPosition);
	
	        easystar.findPath(actorTile.x, actorTile.y, targetTile.x, targetTile.y, callback);
	        easystar.calculate();
	    },
	
	    // used to load tilemap data that was generated in Tiled
	    loadLevel: function loadLevel(level) {
	        var grid = level.getGrid();
	        var walkables = level.getWalkables();
	
	        easystar.setGrid(grid);
	        easystar.setAcceptableTiles(walkables);
	    },
	
	    getCenteredPosition: function getCenteredPosition(obj) {
	        var item = obj;
	        if (obj.sprite) {
	            item = obj.sprite;
	        }
	
	        return new Phaser.Point(Math.floor(item.body.x + _constants2.default.TILEWIDTH / 2), Math.floor(item.body.y + _constants2.default.TILEHEIGHT / 2));
	    },
	
	    pointToTile: pointToTile,
	
	    tileToPoint: tileToPoint
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	*   EasyStar.js
	*   github.com/prettymuchbryce/EasyStarJS
	*   Licensed under the MIT license.
	*
	*   Implementation By Bryce Neal (@prettymuchbryce)
	**/
	
	var EasyStar = {};
	var Instance = __webpack_require__(14);
	var Node = __webpack_require__(15);
	var Heap = __webpack_require__(16);
	
	var CLOSED_LIST = 0;
	var OPEN_LIST = 1;
	
	module.exports = EasyStar;
	
	EasyStar.js = function () {
	    var STRAIGHT_COST = 1.0;
	    var DIAGONAL_COST = 1.4;
	    var syncEnabled = false;
	    var pointsToAvoid = {};
	    var collisionGrid;
	    var costMap = {};
	    var pointsToCost = {};
	    var directionalConditions = {};
	    var allowCornerCutting = true;
	    var iterationsSoFar;
	    var instances = [];
	    var iterationsPerCalculation = Number.MAX_VALUE;
	    var acceptableTiles;
	    var diagonalsEnabled = false;
	
	    /**
	    * Sets the collision grid that EasyStar uses.
	    *
	    * @param {Array|Number} tiles An array of numbers that represent
	    * which tiles in your grid should be considered
	    * acceptable, or "walkable".
	    **/
	    this.setAcceptableTiles = function (tiles) {
	        if (tiles instanceof Array) {
	            // Array
	            acceptableTiles = tiles;
	        } else if (!isNaN(parseFloat(tiles)) && isFinite(tiles)) {
	            // Number
	            acceptableTiles = [tiles];
	        }
	    };
	
	    /**
	    * Enables sync mode for this EasyStar instance..
	    * if you're into that sort of thing.
	    **/
	    this.enableSync = function () {
	        syncEnabled = true;
	    };
	
	    /**
	    * Disables sync mode for this EasyStar instance.
	    **/
	    this.disableSync = function () {
	        syncEnabled = false;
	    };
	
	    /**
	     * Enable diagonal pathfinding.
	     */
	    this.enableDiagonals = function () {
	        diagonalsEnabled = true;
	    };
	
	    /**
	     * Disable diagonal pathfinding.
	     */
	    this.disableDiagonals = function () {
	        diagonalsEnabled = false;
	    };
	
	    /**
	    * Sets the collision grid that EasyStar uses.
	    *
	    * @param {Array} grid The collision grid that this EasyStar instance will read from.
	    * This should be a 2D Array of Numbers.
	    **/
	    this.setGrid = function (grid) {
	        collisionGrid = grid;
	
	        //Setup cost map
	        for (var y = 0; y < collisionGrid.length; y++) {
	            for (var x = 0; x < collisionGrid[0].length; x++) {
	                if (!costMap[collisionGrid[y][x]]) {
	                    costMap[collisionGrid[y][x]] = 1;
	                }
	            }
	        }
	    };
	
	    /**
	    * Sets the tile cost for a particular tile type.
	    *
	    * @param {Number} The tile type to set the cost for.
	    * @param {Number} The multiplicative cost associated with the given tile.
	    **/
	    this.setTileCost = function (tileType, cost) {
	        costMap[tileType] = cost;
	    };
	
	    /**
	    * Sets the an additional cost for a particular point.
	    * Overrides the cost from setTileCost.
	    *
	    * @param {Number} x The x value of the point to cost.
	    * @param {Number} y The y value of the point to cost.
	    * @param {Number} The multiplicative cost associated with the given point.
	    **/
	    this.setAdditionalPointCost = function (x, y, cost) {
	        pointsToCost[x + '_' + y] = cost;
	    };
	
	    /**
	    * Remove the additional cost for a particular point.
	    *
	    * @param {Number} x The x value of the point to stop costing.
	    * @param {Number} y The y value of the point to stop costing.
	    **/
	    this.removeAdditionalPointCost = function (x, y) {
	        delete pointsToCost[x + '_' + y];
	    };
	
	    /**
	    * Remove all additional point costs.
	    **/
	    this.removeAllAdditionalPointCosts = function () {
	        pointsToCost = {};
	    };
	
	    /**
	    * Sets a directional condition on a tile
	    *
	    * @param {Number} x The x value of the point.
	    * @param {Number} y The y value of the point.
	    * @param {Array.<String>} allowedDirections A list of all the allowed directions that can access
	    * the tile.
	    **/
	    this.setDirectionalCondition = function (x, y, allowedDirections) {
	        directionalConditions[x + '_' + y] = allowedDirections;
	    };
	
	    /**
	    * Remove all directional conditions
	    **/
	    this.removeAllDirectionalConditions = function () {
	        directionalConditions = {};
	    };
	
	    /**
	    * Sets the number of search iterations per calculation.
	    * A lower number provides a slower result, but more practical if you
	    * have a large tile-map and don't want to block your thread while
	    * finding a path.
	    *
	    * @param {Number} iterations The number of searches to prefrom per calculate() call.
	    **/
	    this.setIterationsPerCalculation = function (iterations) {
	        iterationsPerCalculation = iterations;
	    };
	
	    /**
	    * Avoid a particular point on the grid,
	    * regardless of whether or not it is an acceptable tile.
	    *
	    * @param {Number} x The x value of the point to avoid.
	    * @param {Number} y The y value of the point to avoid.
	    **/
	    this.avoidAdditionalPoint = function (x, y) {
	        pointsToAvoid[x + "_" + y] = 1;
	    };
	
	    /**
	    * Stop avoiding a particular point on the grid.
	    *
	    * @param {Number} x The x value of the point to stop avoiding.
	    * @param {Number} y The y value of the point to stop avoiding.
	    **/
	    this.stopAvoidingAdditionalPoint = function (x, y) {
	        delete pointsToAvoid[x + "_" + y];
	    };
	
	    /**
	    * Enables corner cutting in diagonal movement.
	    **/
	    this.enableCornerCutting = function () {
	        allowCornerCutting = true;
	    };
	
	    /**
	    * Disables corner cutting in diagonal movement.
	    **/
	    this.disableCornerCutting = function () {
	        allowCornerCutting = false;
	    };
	
	    /**
	    * Stop avoiding all additional points on the grid.
	    **/
	    this.stopAvoidingAllAdditionalPoints = function () {
	        pointsToAvoid = {};
	    };
	
	    /**
	    * Find a path.
	    *
	    * @param {Number} startX The X position of the starting point.
	    * @param {Number} startY The Y position of the starting point.
	    * @param {Number} endX The X position of the ending point.
	    * @param {Number} endY The Y position of the ending point.
	    * @param {Function} callback A function that is called when your path
	    * is found, or no path is found.
	    *
	    **/
	    this.findPath = function (startX, startY, endX, endY, callback) {
	        // Wraps the callback for sync vs async logic
	        var callbackWrapper = function callbackWrapper(result) {
	            if (syncEnabled) {
	                callback(result);
	            } else {
	                setTimeout(function () {
	                    callback(result);
	                });
	            }
	        };
	
	        // No acceptable tiles were set
	        if (acceptableTiles === undefined) {
	            throw new Error("You can't set a path without first calling setAcceptableTiles() on EasyStar.");
	        }
	        // No grid was set
	        if (collisionGrid === undefined) {
	            throw new Error("You can't set a path without first calling setGrid() on EasyStar.");
	        }
	
	        // Start or endpoint outside of scope.
	        if (startX < 0 || startY < 0 || endX < 0 || endY < 0 || startX > collisionGrid[0].length - 1 || startY > collisionGrid.length - 1 || endX > collisionGrid[0].length - 1 || endY > collisionGrid.length - 1) {
	            throw new Error("Your start or end point is outside the scope of your grid.");
	        }
	
	        // Start and end are the same tile.
	        if (startX === endX && startY === endY) {
	            callbackWrapper([]);
	            return;
	        }
	
	        // End point is not an acceptable tile.
	        var endTile = collisionGrid[endY][endX];
	        var isAcceptable = false;
	        for (var i = 0; i < acceptableTiles.length; i++) {
	            if (endTile === acceptableTiles[i]) {
	                isAcceptable = true;
	                break;
	            }
	        }
	
	        if (isAcceptable === false) {
	            callbackWrapper(null);
	            return;
	        }
	
	        // Create the instance
	        var instance = new Instance();
	        instance.openList = new Heap(function (nodeA, nodeB) {
	            return nodeA.bestGuessDistance() - nodeB.bestGuessDistance();
	        });
	        instance.isDoneCalculating = false;
	        instance.nodeHash = {};
	        instance.startX = startX;
	        instance.startY = startY;
	        instance.endX = endX;
	        instance.endY = endY;
	        instance.callback = callbackWrapper;
	
	        instance.openList.push(coordinateToNode(instance, instance.startX, instance.startY, null, STRAIGHT_COST));
	
	        instances.push(instance);
	    };
	
	    /**
	    * This method steps through the A* Algorithm in an attempt to
	    * find your path(s). It will search 4-8 tiles (depending on diagonals) for every calculation.
	    * You can change the number of calculations done in a call by using
	    * easystar.setIteratonsPerCalculation().
	    **/
	    this.calculate = function () {
	        if (instances.length === 0 || collisionGrid === undefined || acceptableTiles === undefined) {
	            return;
	        }
	        for (iterationsSoFar = 0; iterationsSoFar < iterationsPerCalculation; iterationsSoFar++) {
	            if (instances.length === 0) {
	                return;
	            }
	
	            if (syncEnabled) {
	                // If this is a sync instance, we want to make sure that it calculates synchronously.
	                iterationsSoFar = 0;
	            }
	
	            // Couldn't find a path.
	            if (instances[0].openList.size() === 0) {
	                var ic = instances[0];
	                ic.callback(null);
	                instances.shift();
	                continue;
	            }
	
	            var searchNode = instances[0].openList.pop();
	
	            // Handles the case where we have found the destination
	            if (instances[0].endX === searchNode.x && instances[0].endY === searchNode.y) {
	                instances[0].isDoneCalculating = true;
	                var path = [];
	                path.push({ x: searchNode.x, y: searchNode.y });
	                var parent = searchNode.parent;
	                while (parent != null) {
	                    path.push({ x: parent.x, y: parent.y });
	                    parent = parent.parent;
	                }
	                path.reverse();
	                var ic = instances[0];
	                var ip = path;
	                ic.callback(ip);
	                return;
	            }
	
	            var tilesToSearch = [];
	            searchNode.list = CLOSED_LIST;
	
	            if (searchNode.y > 0) {
	                tilesToSearch.push({ instance: instances[0], searchNode: searchNode,
	                    x: 0, y: -1, cost: STRAIGHT_COST * getTileCost(searchNode.x, searchNode.y - 1) });
	            }
	            if (searchNode.x < collisionGrid[0].length - 1) {
	                tilesToSearch.push({ instance: instances[0], searchNode: searchNode,
	                    x: 1, y: 0, cost: STRAIGHT_COST * getTileCost(searchNode.x + 1, searchNode.y) });
	            }
	            if (searchNode.y < collisionGrid.length - 1) {
	                tilesToSearch.push({ instance: instances[0], searchNode: searchNode,
	                    x: 0, y: 1, cost: STRAIGHT_COST * getTileCost(searchNode.x, searchNode.y + 1) });
	            }
	            if (searchNode.x > 0) {
	                tilesToSearch.push({ instance: instances[0], searchNode: searchNode,
	                    x: -1, y: 0, cost: STRAIGHT_COST * getTileCost(searchNode.x - 1, searchNode.y) });
	            }
	            if (diagonalsEnabled) {
	                if (searchNode.x > 0 && searchNode.y > 0) {
	
	                    if (allowCornerCutting || isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y - 1) && isTileWalkable(collisionGrid, acceptableTiles, searchNode.x - 1, searchNode.y)) {
	
	                        tilesToSearch.push({ instance: instances[0], searchNode: searchNode,
	                            x: -1, y: -1, cost: DIAGONAL_COST * getTileCost(searchNode.x - 1, searchNode.y - 1) });
	                    }
	                }
	                if (searchNode.x < collisionGrid[0].length - 1 && searchNode.y < collisionGrid.length - 1) {
	
	                    if (allowCornerCutting || isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y + 1) && isTileWalkable(collisionGrid, acceptableTiles, searchNode.x + 1, searchNode.y)) {
	
	                        tilesToSearch.push({ instance: instances[0], searchNode: searchNode,
	                            x: 1, y: 1, cost: DIAGONAL_COST * getTileCost(searchNode.x + 1, searchNode.y + 1) });
	                    }
	                }
	                if (searchNode.x < collisionGrid[0].length - 1 && searchNode.y > 0) {
	
	                    if (allowCornerCutting || isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y - 1) && isTileWalkable(collisionGrid, acceptableTiles, searchNode.x + 1, searchNode.y)) {
	
	                        tilesToSearch.push({ instance: instances[0], searchNode: searchNode,
	                            x: 1, y: -1, cost: DIAGONAL_COST * getTileCost(searchNode.x + 1, searchNode.y - 1) });
	                    }
	                }
	                if (searchNode.x > 0 && searchNode.y < collisionGrid.length - 1) {
	
	                    if (allowCornerCutting || isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y + 1) && isTileWalkable(collisionGrid, acceptableTiles, searchNode.x - 1, searchNode.y)) {
	
	                        tilesToSearch.push({ instance: instances[0], searchNode: searchNode,
	                            x: -1, y: 1, cost: DIAGONAL_COST * getTileCost(searchNode.x - 1, searchNode.y + 1) });
	                    }
	                }
	            }
	
	            var isDoneCalculating = false;
	
	            // Search all of the surrounding nodes
	            for (var i = 0; i < tilesToSearch.length; i++) {
	                checkAdjacentNode(tilesToSearch[i].instance, tilesToSearch[i].searchNode, tilesToSearch[i].x, tilesToSearch[i].y, tilesToSearch[i].cost);
	                if (tilesToSearch[i].instance.isDoneCalculating === true) {
	                    isDoneCalculating = true;
	                    break;
	                }
	            }
	
	            if (isDoneCalculating) {
	                instances.shift();
	                continue;
	            }
	        }
	    };
	
	    // Private methods follow
	    var checkAdjacentNode = function checkAdjacentNode(instance, searchNode, x, y, cost) {
	        var adjacentCoordinateX = searchNode.x + x;
	        var adjacentCoordinateY = searchNode.y + y;
	
	        if (pointsToAvoid[adjacentCoordinateX + "_" + adjacentCoordinateY] === undefined && isTileWalkable(collisionGrid, acceptableTiles, adjacentCoordinateX, adjacentCoordinateY, searchNode)) {
	            var node = coordinateToNode(instance, adjacentCoordinateX, adjacentCoordinateY, searchNode, cost);
	
	            if (node.list === undefined) {
	                node.list = OPEN_LIST;
	                instance.openList.push(node);
	            } else if (searchNode.costSoFar + cost < node.costSoFar) {
	                node.costSoFar = searchNode.costSoFar + cost;
	                node.parent = searchNode;
	                instance.openList.updateItem(node);
	            }
	        }
	    };
	
	    // Helpers
	    var isTileWalkable = function isTileWalkable(collisionGrid, acceptableTiles, x, y, sourceNode) {
	        if (directionalConditions[x + "_" + y]) {
	            var direction = calculateDirection(sourceNode.x - x, sourceNode.y - y);
	            var directionIncluded = function directionIncluded() {
	                for (var i = 0; i < directionalConditions[x + "_" + y].length; i++) {
	                    if (directionalConditions[x + "_" + y][i] === direction) return true;
	                }
	                return false;
	            };
	            if (!directionIncluded()) return false;
	        }
	        for (var i = 0; i < acceptableTiles.length; i++) {
	            if (collisionGrid[y][x] === acceptableTiles[i]) {
	                return true;
	            }
	        }
	
	        return false;
	    };
	
	    /**
	     * -1, -1 | 0, -1  | 1, -1
	     * -1,  0 | SOURCE | 1,  0
	     * -1,  1 | 0,  1  | 1,  1
	     */
	    var calculateDirection = function calculateDirection(diffX, diffY) {
	        if (diffX === 0, diffY === -1) return EasyStar.BOTTOM;else if (diffX === 1, diffY === -1) return EasyStar.BOTTOM_LEFT;else if (diffX === 1, diffY === 0) return EasyStar.LEFT;else if (diffX === 1, diffY === 1) return EasyStar.TOP_LEFT;else if (diffX === 0, diffY === 1) return EasyStar.TOP;else if (diffX === -1, diffY === 1) return EasyStar.TOP_RIGHT;else if (diffX === -1, diffY === 0) return EasyStar.RIGHT;else if (diffX === -1, diffY === -1) return EasyStar.BOTTOM_RIGHT;
	        throw new Error('These differences are not valid: ' + diffX + ', ' + diffY);
	    };
	
	    var getTileCost = function getTileCost(x, y) {
	        return pointsToCost[x + '_' + y] || costMap[collisionGrid[y][x]];
	    };
	
	    var coordinateToNode = function coordinateToNode(instance, x, y, parent, cost) {
	        if (instance.nodeHash[x + "_" + y] !== undefined) {
	            return instance.nodeHash[x + "_" + y];
	        }
	        var simpleDistanceToTarget = getDistance(x, y, instance.endX, instance.endY);
	        if (parent !== null) {
	            var costSoFar = parent.costSoFar + cost;
	        } else {
	            costSoFar = 0;
	        }
	        var node = new Node(parent, x, y, costSoFar, simpleDistanceToTarget);
	        instance.nodeHash[x + "_" + y] = node;
	        return node;
	    };
	
	    var getDistance = function getDistance(x1, y1, x2, y2) {
	        if (diagonalsEnabled) {
	            // Octile distance
	            var dx = Math.abs(x1 - x2);
	            var dy = Math.abs(y1 - y2);
	            if (dx < dy) {
	                return DIAGONAL_COST * dx + dy;
	            } else {
	                return DIAGONAL_COST * dy + dx;
	            }
	        } else {
	            // Manhattan distance
	            var dx = Math.abs(x1 - x2);
	            var dy = Math.abs(y1 - y2);
	            return dx + dy;
	        }
	    };
	};
	
	EasyStar.TOP = 'TOP';
	EasyStar.TOP_RIGHT = 'TOP_RIGHT';
	EasyStar.RIGHT = 'RIGHT';
	EasyStar.BOTTOM_RIGHT = 'BOTTOM_RIGHT';
	EasyStar.BOTTOM = 'BOTTOM';
	EasyStar.BOTTOM_LEFT = 'BOTTOM_LEFT';
	EasyStar.LEFT = 'LEFT';
	EasyStar.TOP_LEFT = 'TOP_LEFT';

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * Represents a single instance of EasyStar.
	 * A path that is in the queue to eventually be found.
	 */
	module.exports = function () {
	    this.isDoneCalculating = true;
	    this.pointsToAvoid = {};
	    this.startX;
	    this.callback;
	    this.startY;
	    this.endX;
	    this.endY;
	    this.nodeHash = {};
	    this.openList;
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	* A simple Node that represents a single tile on the grid.
	* @param {Object} parent The parent node.
	* @param {Number} x The x position on the grid.
	* @param {Number} y The y position on the grid.
	* @param {Number} costSoFar How far this node is in moves*cost from the start.
	* @param {Number} simpleDistanceToTarget Manhatten distance to the end point.
	**/
	module.exports = function (parent, x, y, costSoFar, simpleDistanceToTarget) {
	    this.parent = parent;
	    this.x = x;
	    this.y = y;
	    this.costSoFar = costSoFar;
	    this.simpleDistanceToTarget = simpleDistanceToTarget;
	
	    /**
	    * @return {Number} Best guess distance of a cost using this node.
	    **/
	    this.bestGuessDistance = function () {
	        return this.costSoFar + this.simpleDistanceToTarget;
	    };
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(17);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	// Generated by CoffeeScript 1.8.0
	(function () {
	  var Heap, defaultCmp, floor, heapify, heappop, heappush, heappushpop, heapreplace, insort, min, nlargest, nsmallest, updateItem, _siftdown, _siftup;
	
	  floor = Math.floor, min = Math.min;
	
	  /*
	  Default comparison function to be used
	   */
	
	  defaultCmp = function defaultCmp(x, y) {
	    if (x < y) {
	      return -1;
	    }
	    if (x > y) {
	      return 1;
	    }
	    return 0;
	  };
	
	  /*
	  Insert item x in list a, and keep it sorted assuming a is sorted.
	  
	  If x is already in a, insert it to the right of the rightmost x.
	  
	  Optional args lo (default 0) and hi (default a.length) bound the slice
	  of a to be searched.
	   */
	
	  insort = function insort(a, x, lo, hi, cmp) {
	    var mid;
	    if (lo == null) {
	      lo = 0;
	    }
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    if (lo < 0) {
	      throw new Error('lo must be non-negative');
	    }
	    if (hi == null) {
	      hi = a.length;
	    }
	    while (lo < hi) {
	      mid = floor((lo + hi) / 2);
	      if (cmp(x, a[mid]) < 0) {
	        hi = mid;
	      } else {
	        lo = mid + 1;
	      }
	    }
	    return [].splice.apply(a, [lo, lo - lo].concat(x)), x;
	  };
	
	  /*
	  Push item onto heap, maintaining the heap invariant.
	   */
	
	  heappush = function heappush(array, item, cmp) {
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    array.push(item);
	    return _siftdown(array, 0, array.length - 1, cmp);
	  };
	
	  /*
	  Pop the smallest item off the heap, maintaining the heap invariant.
	   */
	
	  heappop = function heappop(array, cmp) {
	    var lastelt, returnitem;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    lastelt = array.pop();
	    if (array.length) {
	      returnitem = array[0];
	      array[0] = lastelt;
	      _siftup(array, 0, cmp);
	    } else {
	      returnitem = lastelt;
	    }
	    return returnitem;
	  };
	
	  /*
	  Pop and return the current smallest value, and add the new item.
	  
	  This is more efficient than heappop() followed by heappush(), and can be
	  more appropriate when using a fixed size heap. Note that the value
	  returned may be larger than item! That constrains reasonable use of
	  this routine unless written as part of a conditional replacement:
	      if item > array[0]
	        item = heapreplace(array, item)
	   */
	
	  heapreplace = function heapreplace(array, item, cmp) {
	    var returnitem;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    returnitem = array[0];
	    array[0] = item;
	    _siftup(array, 0, cmp);
	    return returnitem;
	  };
	
	  /*
	  Fast version of a heappush followed by a heappop.
	   */
	
	  heappushpop = function heappushpop(array, item, cmp) {
	    var _ref;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    if (array.length && cmp(array[0], item) < 0) {
	      _ref = [array[0], item], item = _ref[0], array[0] = _ref[1];
	      _siftup(array, 0, cmp);
	    }
	    return item;
	  };
	
	  /*
	  Transform list into a heap, in-place, in O(array.length) time.
	   */
	
	  heapify = function heapify(array, cmp) {
	    var i, _i, _j, _len, _ref, _ref1, _results, _results1;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    _ref1 = function () {
	      _results1 = [];
	      for (var _j = 0, _ref = floor(array.length / 2); 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--) {
	        _results1.push(_j);
	      }
	      return _results1;
	    }.apply(this).reverse();
	    _results = [];
	    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	      i = _ref1[_i];
	      _results.push(_siftup(array, i, cmp));
	    }
	    return _results;
	  };
	
	  /*
	  Update the position of the given item in the heap.
	  This function should be called every time the item is being modified.
	   */
	
	  updateItem = function updateItem(array, item, cmp) {
	    var pos;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    pos = array.indexOf(item);
	    if (pos === -1) {
	      return;
	    }
	    _siftdown(array, 0, pos, cmp);
	    return _siftup(array, pos, cmp);
	  };
	
	  /*
	  Find the n largest elements in a dataset.
	   */
	
	  nlargest = function nlargest(array, n, cmp) {
	    var elem, result, _i, _len, _ref;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    result = array.slice(0, n);
	    if (!result.length) {
	      return result;
	    }
	    heapify(result, cmp);
	    _ref = array.slice(n);
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      elem = _ref[_i];
	      heappushpop(result, elem, cmp);
	    }
	    return result.sort(cmp).reverse();
	  };
	
	  /*
	  Find the n smallest elements in a dataset.
	   */
	
	  nsmallest = function nsmallest(array, n, cmp) {
	    var elem, i, los, result, _i, _j, _len, _ref, _ref1, _results;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    if (n * 10 <= array.length) {
	      result = array.slice(0, n).sort(cmp);
	      if (!result.length) {
	        return result;
	      }
	      los = result[result.length - 1];
	      _ref = array.slice(n);
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        elem = _ref[_i];
	        if (cmp(elem, los) < 0) {
	          insort(result, elem, 0, null, cmp);
	          result.pop();
	          los = result[result.length - 1];
	        }
	      }
	      return result;
	    }
	    heapify(array, cmp);
	    _results = [];
	    for (i = _j = 0, _ref1 = min(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
	      _results.push(heappop(array, cmp));
	    }
	    return _results;
	  };
	
	  _siftdown = function _siftdown(array, startpos, pos, cmp) {
	    var newitem, parent, parentpos;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    newitem = array[pos];
	    while (pos > startpos) {
	      parentpos = pos - 1 >> 1;
	      parent = array[parentpos];
	      if (cmp(newitem, parent) < 0) {
	        array[pos] = parent;
	        pos = parentpos;
	        continue;
	      }
	      break;
	    }
	    return array[pos] = newitem;
	  };
	
	  _siftup = function _siftup(array, pos, cmp) {
	    var childpos, endpos, newitem, rightpos, startpos;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    endpos = array.length;
	    startpos = pos;
	    newitem = array[pos];
	    childpos = 2 * pos + 1;
	    while (childpos < endpos) {
	      rightpos = childpos + 1;
	      if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
	        childpos = rightpos;
	      }
	      array[pos] = array[childpos];
	      pos = childpos;
	      childpos = 2 * pos + 1;
	    }
	    array[pos] = newitem;
	    return _siftdown(array, startpos, pos, cmp);
	  };
	
	  Heap = function () {
	    Heap.push = heappush;
	
	    Heap.pop = heappop;
	
	    Heap.replace = heapreplace;
	
	    Heap.pushpop = heappushpop;
	
	    Heap.heapify = heapify;
	
	    Heap.updateItem = updateItem;
	
	    Heap.nlargest = nlargest;
	
	    Heap.nsmallest = nsmallest;
	
	    function Heap(cmp) {
	      this.cmp = cmp != null ? cmp : defaultCmp;
	      this.nodes = [];
	    }
	
	    Heap.prototype.push = function (x) {
	      return heappush(this.nodes, x, this.cmp);
	    };
	
	    Heap.prototype.pop = function () {
	      return heappop(this.nodes, this.cmp);
	    };
	
	    Heap.prototype.peek = function () {
	      return this.nodes[0];
	    };
	
	    Heap.prototype.contains = function (x) {
	      return this.nodes.indexOf(x) !== -1;
	    };
	
	    Heap.prototype.replace = function (x) {
	      return heapreplace(this.nodes, x, this.cmp);
	    };
	
	    Heap.prototype.pushpop = function (x) {
	      return heappushpop(this.nodes, x, this.cmp);
	    };
	
	    Heap.prototype.heapify = function () {
	      return heapify(this.nodes, this.cmp);
	    };
	
	    Heap.prototype.updateItem = function (x) {
	      return updateItem(this.nodes, x, this.cmp);
	    };
	
	    Heap.prototype.clear = function () {
	      return this.nodes = [];
	    };
	
	    Heap.prototype.empty = function () {
	      return this.nodes.length === 0;
	    };
	
	    Heap.prototype.size = function () {
	      return this.nodes.length;
	    };
	
	    Heap.prototype.clone = function () {
	      var heap;
	      heap = new Heap();
	      heap.nodes = this.nodes.slice(0);
	      return heap;
	    };
	
	    Heap.prototype.toArray = function () {
	      return this.nodes.slice(0);
	    };
	
	    Heap.prototype.insert = Heap.prototype.push;
	
	    Heap.prototype.top = Heap.prototype.peek;
	
	    Heap.prototype.front = Heap.prototype.peek;
	
	    Heap.prototype.has = Heap.prototype.contains;
	
	    Heap.prototype.copy = Heap.prototype.clone;
	
	    return Heap;
	  }();
	
	  (function (root, factory) {
	    if (true) {
	      return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
	      return module.exports = factory();
	    } else {
	      return root.Heap = factory();
	    }
	  })(this, function () {
	    return Heap;
	  });
	}).call(undefined);

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var scheduler = new ROT.Scheduler.Action();
	var PAUSE_RETRY = 250;
	var pauseCount = 0;
	
	exports.default = {
	    ticked: new Phaser.Signal(),
	    start: function start() {
	        this._tick();
	    },
	    addActor: function addActor(actor) {
	        scheduler.add(actor, true);
	    },
	    pause: function pause() {
	        pauseCount++;
	    },
	    continue: function _continue() {
	        pauseCount--;
	    },
	    _tick: function _tick() {
	        var _this = this;
	
	        if (pauseCount > 0) {
	            console.log('scheduling paused');
	            return setTimeout(this._tick, PAUSE_RETRY);
	        }
	
	        var current = scheduler.next();
	        current.act().then(function (duration) {
	            console.log('action completed, ' + duration + ' ' + scheduler.getTime());
	            scheduler.setDuration(duration);
	            _this.ticked.dispatch();
	            _this._tick();
	        }).catch(function (reason) {
	            console.log('action failed: ' + reason);
	            scheduler.setDuration(0);
	            debugger;
	            // this._tick()
	        });
	    }
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var initialContext = {
	    input: {
	        isBlocked: false
	    },
	    player: {
	        health: 10,
	        speed: 10,
	        position: {
	            x: 2,
	            y: 2
	        },
	        destinationPath: []
	    },
	    enemies: {}
	};
	
	exports.default = {
	    init: function init(game) {
	        game.context = initialContext;
	    }
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _pathfinding = __webpack_require__(12);
	
	var _pathfinding2 = _interopRequireDefault(_pathfinding);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getTile(level, x, y) {
	    var row = level.map.layer.data[y];
	    if (!row) return;
	
	    var tile = row[x];
	    return tile;
	}
	
	exports.default = {
	    update: function update(player, level) {
	        level.map.layer.data.forEach(function (row) {
	            row.forEach(function (tile) {
	                tile.properties.visible = false;
	            });
	        });
	        var playerTile = _pathfinding2.default.pointToTile(_pathfinding2.default.getCenteredPosition(player));
	
	        var fov = new ROT.FOV.PreciseShadowcasting(function (x, y) {
	            var tile = getTile(level, x, y);
	            if (!tile) return false;
	
	            return tile.properties.walkable && !tile.properties.blockLOS || x === playerTile.x && y === playerTile.y;
	        });
	
	        fov.compute(playerTile.x, playerTile.y, 10, function (x, y, r, visibility) {
	            var tile = getTile(level, x, y);
	            if (!tile) return;
	
	            tile.properties.visible = true;
	            tile.properties.revealed = true;
	        });
	    }
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _MoveAction = __webpack_require__(22);
	
	var _MoveAction2 = _interopRequireDefault(_MoveAction);
	
	var _PauseForInputAction = __webpack_require__(24);
	
	var _PauseForInputAction2 = _interopRequireDefault(_PauseForInputAction);
	
	var _WaitAction = __webpack_require__(25);
	
	var _WaitAction2 = _interopRequireDefault(_WaitAction);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	    move: function move(game, actor, data) {
	        return new _MoveAction2.default(game, actor, data);
	    },
	    pauseForInput: function pauseForInput(game, actor) {
	        return new _PauseForInputAction2.default(game, actor);
	    },
	    wait: function wait(game, actor) {
	        return new _WaitAction2.default(game, actor);
	    }
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Action3 = __webpack_require__(23);
	
	var _Action4 = _interopRequireDefault(_Action3);
	
	var _services = __webpack_require__(11);
	
	var _services2 = _interopRequireDefault(_services);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MoveAction = function (_Action2) {
	    _inherits(MoveAction, _Action2);
	
	    function MoveAction() {
	        _classCallCheck(this, MoveAction);
	
	        return _possibleConstructorReturn(this, (MoveAction.__proto__ || Object.getPrototypeOf(MoveAction)).apply(this, arguments));
	    }
	
	    _createClass(MoveAction, [{
	        key: '_execute',
	        value: function _execute() {
	            var _this2 = this;
	
	            console.log('executing MoveAction');
	            var pathfinder = _services2.default.pathfinding();
	
	            return new Promise(function (resolve, reject) {
	                _this2.path = _this2.payload.destinationPath;
	
	                if (_this2.path.length < 2) {
	                    // at the end of the path
	                    _this2.path.shift();
	                    return resolve(_this2.actor.moveSpeed);
	                }
	
	                var angle = Phaser.Math.radToDeg(Phaser.Math.angleBetweenPoints(_this2.path[0], _this2.path[1]));
	                _this2.actor.moveAngle(angle).then(function () {
	                    _this2.path.shift();
	                    resolve(_this2.actor.moveSpeed);
	                });
	            });
	        }
	    }]);
	
	    return MoveAction;
	}(_Action4.default);
	
	exports.default = MoveAction;

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _Action = function () {
	    function _Action(game, actor, payload) {
	        _classCallCheck(this, _Action);
	
	        this.game = game;
	        this.actor = actor;
	        this.payload = payload;
	    }
	
	    _createClass(_Action, [{
	        key: "execute",
	        value: function execute() {
	            return this._execute();
	        }
	    }]);
	
	    return _Action;
	}();
	
	exports.default = _Action;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Action3 = __webpack_require__(23);
	
	var _Action4 = _interopRequireDefault(_Action3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DURATION = 0;
	
	var PauseForInputAction = function (_Action2) {
	    _inherits(PauseForInputAction, _Action2);
	
	    function PauseForInputAction() {
	        _classCallCheck(this, PauseForInputAction);
	
	        return _possibleConstructorReturn(this, (PauseForInputAction.__proto__ || Object.getPrototypeOf(PauseForInputAction)).apply(this, arguments));
	    }
	
	    _createClass(PauseForInputAction, [{
	        key: '_execute',
	        value: function _execute() {
	            console.log('executing PauseForInputAction');
	            return new Promise(function (resolve) {
	                return setTimeout(function () {
	                    return resolve(DURATION);
	                }, 200);
	            });
	        }
	    }]);
	
	    return PauseForInputAction;
	}(_Action4.default);
	
	exports.default = PauseForInputAction;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Action3 = __webpack_require__(23);
	
	var _Action4 = _interopRequireDefault(_Action3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DURATION = 10;
	
	var WaitAction = function (_Action2) {
	    _inherits(WaitAction, _Action2);
	
	    function WaitAction() {
	        _classCallCheck(this, WaitAction);
	
	        return _possibleConstructorReturn(this, (WaitAction.__proto__ || Object.getPrototypeOf(WaitAction)).apply(this, arguments));
	    }
	
	    _createClass(WaitAction, [{
	        key: '_execute',
	        value: function _execute() {
	            return new Promise(function (resolve) {
	                return resolve(DURATION);
	            });
	        }
	    }]);
	
	    return WaitAction;
	}(_Action4.default);
	
	exports.default = WaitAction;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Actor3 = __webpack_require__(6);
	
	var _Actor4 = _interopRequireDefault(_Actor3);
	
	var _behaviors = __webpack_require__(8);
	
	var _behaviors2 = _interopRequireDefault(_behaviors);
	
	var _services = __webpack_require__(11);
	
	var _services2 = _interopRequireDefault(_services);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Rat = function (_Actor2) {
	    _inherits(Rat, _Actor2);
	
	    function Rat(game, sprite) {
	        _classCallCheck(this, Rat);
	
	        return _possibleConstructorReturn(this, (Rat.__proto__ || Object.getPrototypeOf(Rat)).call(this, game, sprite, _behaviors2.default.player(game)));
	    }
	
	    return Rat;
	}(_Actor4.default);
	
	exports.default = Rat;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _PlayerSprite = __webpack_require__(28);
	
	var _PlayerSprite2 = _interopRequireDefault(_PlayerSprite);
	
	var _RatSprite = __webpack_require__(30);
	
	var _RatSprite2 = _interopRequireDefault(_RatSprite);
	
	var _ChestSprite = __webpack_require__(31);
	
	var _ChestSprite2 = _interopRequireDefault(_ChestSprite);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = {
	    player: function player(game, x, y) {
	        return new _PlayerSprite2.default(game, x, y);
	    },
	
	    rat: function rat(game, x, y) {
	        return new _RatSprite2.default(game, x, y);
	    },
	
	    chest: function chest(game, x, y) {
	        return new _ChestSprite2.default(game, x, y);
	    }
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Sprite3 = __webpack_require__(29);
	
	var _Sprite4 = _interopRequireDefault(_Sprite3);
	
	var _constants = __webpack_require__(7);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PlayerSprite = function (_Sprite2) {
	    _inherits(PlayerSprite, _Sprite2);
	
	    function PlayerSprite(game, x, y) {
	        _classCallCheck(this, PlayerSprite);
	
	        var _this = _possibleConstructorReturn(this, (PlayerSprite.__proto__ || Object.getPrototypeOf(PlayerSprite)).call(this, game, x, y, _constants2.default.SPRITEKEY));
	
	        game.physics.enable(_this);
	        _this.animations.add('idle', [0, 0, 0]);
	        _this.animations.add('walk', [0, 0, 0]);
	        _this.animations.add('walkUp', [0, 0, 0]);
	        _this.animations.add('attack', [0, 0, 0]);
	        _this.animations.play('idle');
	        return _this;
	    }
	
	    return PlayerSprite;
	}(_Sprite4.default);
	
	exports.default = PlayerSprite;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _constants = __webpack_require__(7);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var anchorX = 0.5;
	var anchorY = 0;
	
	var _Sprite = function (_Phaser$Sprite) {
	    _inherits(_Sprite, _Phaser$Sprite);
	
	    function _Sprite(game, x, y, key, frame) {
	        _classCallCheck(this, _Sprite);
	
	        // account for anchor
	        var adjustedX = x + _constants2.default.TILEWIDTH * anchorX;
	        var adjustedY = y + _constants2.default.TILEHEIGHT * anchorY;
	
	        var _this = _possibleConstructorReturn(this, (_Sprite.__proto__ || Object.getPrototypeOf(_Sprite)).call(this, game, adjustedX, adjustedY, key, frame));
	
	        _this.anchor.setTo(anchorX, anchorY);
	        return _this;
	    }
	
	    return _Sprite;
	}(Phaser.Sprite);
	
	exports.default = _Sprite;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Sprite3 = __webpack_require__(29);
	
	var _Sprite4 = _interopRequireDefault(_Sprite3);
	
	var _constants = __webpack_require__(7);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RatSprite = function (_Sprite2) {
	    _inherits(RatSprite, _Sprite2);
	
	    function RatSprite(game, x, y) {
	        _classCallCheck(this, RatSprite);
	
	        var _this = _possibleConstructorReturn(this, (RatSprite.__proto__ || Object.getPrototypeOf(RatSprite)).call(this, game, x, y, _constants2.default.SPRITEKEY));
	
	        game.physics.enable(_this);
	        _this.animations.add('idle', [1]);
	        _this.animations.add('walk', [1]);
	        _this.animations.add('walkUp', [1]);
	        _this.animations.add('attack', [1]);
	        _this.animations.play('idle');
	        return _this;
	    }
	
	    return RatSprite;
	}(_Sprite4.default);
	
	exports.default = RatSprite;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _Sprite3 = __webpack_require__(29);
	
	var _Sprite4 = _interopRequireDefault(_Sprite3);
	
	var _constants = __webpack_require__(7);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ChestSprite = function (_Sprite2) {
	    _inherits(ChestSprite, _Sprite2);
	
	    function ChestSprite(game, x, y) {
	        _classCallCheck(this, ChestSprite);
	
	        var _this = _possibleConstructorReturn(this, (ChestSprite.__proto__ || Object.getPrototypeOf(ChestSprite)).call(this, game, x, y, _constants2.default.SPRITEKEY));
	
	        game.physics.enable(_this);
	        _this.animations.add('idle', [14]);
	        _this.animations.play('idle');
	        return _this;
	    }
	
	    return ChestSprite;
	}(_Sprite4.default);
	
	exports.default = ChestSprite;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _PrefabLevel = __webpack_require__(33);
	
	var _PrefabLevel2 = _interopRequireDefault(_PrefabLevel);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// provides a level
	function getLevel(game, levelConfig) {
	    if (levelConfig) {
	        // TODO: build a level given config params
	    } else {
	        // provide the default level
	        return buildPrefabLevel(game, 'testingGrounds');
	    }
	}
	
	function buildPrefabLevel(game, levelName) {
	    return new _PrefabLevel2.default(game, levelName);
	}
	
	exports.default = {
	    getLevel: getLevel
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Level2 = __webpack_require__(34);
	
	var _Level3 = _interopRequireDefault(_Level2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PrefabLevel = function (_Level) {
	    _inherits(PrefabLevel, _Level);
	
	    function PrefabLevel(game, levelName) {
	        _classCallCheck(this, PrefabLevel);
	
	        var _this = _possibleConstructorReturn(this, (PrefabLevel.__proto__ || Object.getPrototypeOf(PrefabLevel)).call(this, game));
	
	        _this.levelName = levelName;
	        return _this;
	    }
	
	    _createClass(PrefabLevel, [{
	        key: '_subAddMap',
	        value: function _subAddMap() {
	            var _this2 = this;
	
	            this.map = this.game.add.tilemap(this.levelName);
	            var layers = [];
	
	            this.map.tilesets.forEach(function (tileSet) {
	                _this2.map.addTilesetImage(tileSet.name);
	            });
	
	            this.map.layers.forEach(function (layer) {
	                layers.push(_this2.map.createLayer(layer.name));
	            });
	
	            layers[0].resizeWorld();
	
	            return this.map;
	        }
	    }, {
	        key: 'getWalkables',
	        value: function getWalkables() {
	            var walkables = [];
	
	            this.map.tilesets.forEach(function (tileSet) {
	                for (var prop in tileSet.tileProperties) {
	                    if (tileSet.tileProperties.hasOwnProperty(prop)) {
	                        var tileGid = prop + tileSet.firstgid;
	                        if (tileSet.tileProperties[prop].walkable) {
	                            walkables.push(parseInt(prop, 10) + tileSet.firstgid);
	                        }
	                    }
	                }
	            });
	
	            return walkables;
	        }
	    }, {
	        key: 'getGrid',
	        value: function getGrid() {
	            return this.map.layers[0].data.map(function (row) {
	                return row.map(function (column) {
	                    return column.index;
	                });
	            });
	        }
	    }, {
	        key: 'getPlayerPosition',
	        value: function getPlayerPosition() {
	            return this.findObjectsByName('player')[0];
	        }
	    }, {
	        key: 'getEnemies',
	        value: function getEnemies() {
	            return this.findObjectsByType('enemy');
	        }
	    }, {
	        key: 'getItems',
	        value: function getItems() {
	            return this.findObjectsByType('item');
	        }
	    }, {
	        key: 'isTileVisible',
	        value: function isTileVisible(x, y) {
	            return this.map.layer.data[y][x].properties.visible;
	        }
	    }, {
	        key: 'findObjectsByType',
	        value: function findObjectsByType(objectType) {
	            return this.map.objects.objectLayer.filter(function (obj) {
	                return obj.type === objectType;
	            });
	        }
	    }, {
	        key: 'findObjectsByName',
	        value: function findObjectsByName(objectName) {
	            return this.map.objects.objectLayer.filter(function (obj) {
	                return obj.name === objectName;
	            });
	        }
	    }]);
	
	    return PrefabLevel;
	}(_Level3.default);
	
	exports.default = PrefabLevel;

/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// assumptions:
	//  - layer1 has all blocking tiles
	
	var _Level = function () {
	    function _Level(game) {
	        _classCallCheck(this, _Level);
	
	        this.game = game;
	    }
	
	    _createClass(_Level, [{
	        key: "addMap",
	        value: function addMap() {
	            if (this._subAddMap) this._subAddMap();
	        }
	    }, {
	        key: "_getWalkables",
	        value: function _getWalkables() {
	            this.map.tiles.forEach(tile);
	        }
	    }]);
	
	    return _Level;
	}();
	
	exports.default = _Level;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Enemies = __webpack_require__(36);
	
	var _Enemies2 = _interopRequireDefault(_Enemies);
	
	var _Items = __webpack_require__(37);
	
	var _Items2 = _interopRequireDefault(_Items);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = {
	    enemies: function enemies(game) {
	        return new _Enemies2.default(game);
	    },
	    items: function items(game) {
	        return new _Items2.default(game);
	    }
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _constants = __webpack_require__(7);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _actors = __webpack_require__(4);
	
	var _actors2 = _interopRequireDefault(_actors);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Enemies = function (_Phaser$Group) {
	    _inherits(Enemies, _Phaser$Group);
	
	    function Enemies(game) {
	        _classCallCheck(this, Enemies);
	
	        return _possibleConstructorReturn(this, (Enemies.__proto__ || Object.getPrototypeOf(Enemies)).call(this, game));
	    }
	
	    _createClass(Enemies, [{
	        key: 'initEnemy',
	        value: function initEnemy(enemyObj) {
	            var name = enemyObj.name,
	                x = enemyObj.x,
	                y = enemyObj.y;
	
	            _actors2.default[name](this.game, x, y, this);
	        }
	    }, {
	        key: 'initEnemies',
	        value: function initEnemies(enemyObjs) {
	            var _this2 = this;
	
	            enemyObjs.forEach(function (enemyObj) {
	                _this2.initEnemy(enemyObj);
	            });
	        }
	    }]);
	
	    return Enemies;
	}(Phaser.Group);
	
	exports.default = Enemies;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _constants = __webpack_require__(7);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _items = __webpack_require__(38);
	
	var _items2 = _interopRequireDefault(_items);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Enemies = function (_Phaser$Group) {
	    _inherits(Enemies, _Phaser$Group);
	
	    function Enemies(game) {
	        _classCallCheck(this, Enemies);
	
	        return _possibleConstructorReturn(this, (Enemies.__proto__ || Object.getPrototypeOf(Enemies)).call(this, game));
	    }
	
	    _createClass(Enemies, [{
	        key: 'initItem',
	        value: function initItem(itemObj) {
	            var name = itemObj.name,
	                x = itemObj.x,
	                y = itemObj.y;
	
	            _items2.default[name](this.game, x, y, this);
	        }
	    }, {
	        key: 'initItems',
	        value: function initItems(itemObjs) {
	            var _this2 = this;
	
	            itemObjs.forEach(function (itemObj) {
	                _this2.initItem(itemObj);
	            });
	        }
	    }]);
	
	    return Enemies;
	}(Phaser.Group);
	
	exports.default = Enemies;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Chest = __webpack_require__(39);
	
	var _Chest2 = _interopRequireDefault(_Chest);
	
	var _sprites = __webpack_require__(27);
	
	var _sprites2 = _interopRequireDefault(_sprites);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = {
	    chest: function chest(game, x, y) {
	        var group = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
	
	        var sprite = _sprites2.default.chest(game, x, y);
	        var chest = new _Chest2.default(game, sprite);
	
	        if (group) {
	            group.add(chest.sprite);
	        }
	
	        return chest;
	    }
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Item3 = __webpack_require__(40);
	
	var _Item4 = _interopRequireDefault(_Item3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Chest = function (_Item2) {
	    _inherits(Chest, _Item2);
	
	    function Chest(game, sprite, contents) {
	        var isOpen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	
	        _classCallCheck(this, Chest);
	
	        var _this = _possibleConstructorReturn(this, (Chest.__proto__ || Object.getPrototypeOf(Chest)).call(this, game, sprite));
	
	        _this.isOpen = isOpen;
	
	        if (contents) {
	            _this.contents = contents;
	        }
	        return _this;
	    }
	
	    _createClass(Chest, [{
	        key: 'setContents',
	        value: function setContents(contents) {
	            this.contents = contents;
	        }
	    }, {
	        key: 'getContents',
	        value: function getContents() {
	            return this.contents;
	        }
	    }]);
	
	    return Chest;
	}(_Item4.default);
	
	exports.default = Chest;

/***/ },
/* 40 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _Item = function _Item(game, sprite) {
	    _classCallCheck(this, _Item);
	
	    this.game = game;
	    this.sprite = sprite;
	};
	
	exports.default = _Item;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _State3 = __webpack_require__(3);
	
	var _State4 = _interopRequireDefault(_State3);
	
	var _fonts = __webpack_require__(42);
	
	var _fonts2 = _interopRequireDefault(_fonts);
	
	var _sprites = __webpack_require__(27);
	
	var _sprites2 = _interopRequireDefault(_sprites);
	
	var _constants = __webpack_require__(7);
	
	var _constants2 = _interopRequireDefault(_constants);
	
	var _ui = __webpack_require__(45);
	
	var _ui2 = _interopRequireDefault(_ui);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Loading = function (_State2) {
	    _inherits(Loading, _State2);
	
	    function Loading() {
	        _classCallCheck(this, Loading);
	
	        return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
	    }
	
	    _createClass(Loading, [{
	        key: 'init',
	        value: function init() {
	            // Pixel-perfect canvas scaling!
	            // Thanks to http://www.belenalbeza.com/retro-crisp-pixel-art-in-phaser/
	            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	            this.game.scale.pageAlignHorizontally = true;
	            this.game.scale.pageAlignVertically = true;
	
	            // Rounds x/y positions to the nearest whole to avoid sub-pixel rendering
	            this.game.renderer.renderSession.roundPixels = true;
	
	            // Sets browser-prefixed "image-rendering" CSS property on the game canvas
	            Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
	
	            // Prevent these keys from being handled by the browser
	            // when the game is in focus
	            this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
	        }
	    }, {
	        key: 'preload',
	        value: function preload() {
	            var _this2 = this;
	
	            _ui2.default.load(this.game, function () {
	                _this2.stateProvider.menu(_this2.state);
	            });
	
	            _fonts2.default.loadResources(this);
	
	            this.game.load.image('tiles', 'assets/16x16/simpleGraphics_tiles16x16.png');
	            this.game.load.image('new', 'assets/16x16/retro_tiles.png');
	            this.game.load.tilemap('testingGrounds', 'assets/testingGrounds.json', null, Phaser.Tilemap.TILED_JSON);
	            this.game.load.spritesheet(_constants2.default.SPRITEKEY, 'assets/16x16/retro_tiles.png', _constants2.default.TILEWIDTH, _constants2.default.TILEHEIGHT);
	        }
	    }]);
	
	    return Loading;
	}(_State4.default);
	
	exports.default = Loading;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _MenuFont = __webpack_require__(43);
	
	var _MenuFont2 = _interopRequireDefault(_MenuFont);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = {
	    loadResources: function loadResources(loader) {
	        _MenuFont2.default.loadResource(loader);
	    },
	
	    menu: function menu(game, x, y, text, size, align, group) {
	        var font = new _MenuFont2.default(game, x, y, text, size, align);
	
	        if (group) {
	            group.add(font);
	        }
	
	        return font;
	    }
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BitmapFont3 = __webpack_require__(44);
	
	var _BitmapFont4 = _interopRequireDefault(_BitmapFont3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var KEY = 'apple';
	var FONT = '/assets/fonts/apple.png';
	var MAP = '/assets/fonts/apple.fnt';
	
	var MenuFont = function (_BitmapFont2) {
	    _inherits(MenuFont, _BitmapFont2);
	
	    _createClass(MenuFont, null, [{
	        key: 'loadResource',
	        value: function loadResource(loader) {
	            loader.load.bitmapFont(KEY, FONT, MAP);
	        }
	    }]);
	
	    function MenuFont(game, x, y, text, size, align) {
	        _classCallCheck(this, MenuFont);
	
	        return _possibleConstructorReturn(this, (MenuFont.__proto__ || Object.getPrototypeOf(MenuFont)).call(this, game, x, y, KEY, text, size, align));
	    }
	
	    return MenuFont;
	}(_BitmapFont4.default);
	
	exports.default = MenuFont;

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _BitmapFont = function (_Phaser$BitmapText) {
	    _inherits(_BitmapFont, _Phaser$BitmapText);
	
	    function _BitmapFont(game, x, y, font, text, size, align) {
	        _classCallCheck(this, _BitmapFont);
	
	        return _possibleConstructorReturn(this, (_BitmapFont.__proto__ || Object.getPrototypeOf(_BitmapFont)).call(this, game, x, y, font, text, size, align));
	    }
	
	    /**
	    * @override Phaser.BitmapText._align
	    */
	
	
	    _createClass(_BitmapFont, [{
	        key: '_align',
	        set: function set(value) {
	            this.__align = value;
	            switch (value) {
	                case 'center':
	                    this.anchor.x = 0.5;
	                    this.anchor.y = 0.5;
	                    break;
	                case 'right':
	                    this.anchor.x = 1;
	                    this.anchor.y = 0.5;
	                    break;
	                case 'left':
	                default:
	                    this.anchor.x = 0;
	                    this.anchor.y = 0.5;
	                    break;
	            }
	        },
	        get: function get() {
	            return this.__align;
	        }
	    }]);
	
	    return _BitmapFont;
	}(Phaser.BitmapText);
	
	exports.default = _BitmapFont;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _menu = __webpack_require__(46);
	
	var _menu2 = _interopRequireDefault(_menu);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var menuScreen = void 0;
	
	exports.default = {
	    load: function load(game, callback) {
	        var uiAssets = ['./images/btn-line.png', './images/btn-line-down.png'];
	
	        uiAssets.forEach(function (asset) {
	            game.load.image(asset, 'assets/ui-theme/' + asset);
	        });
	
	        game.load.onLoadComplete.add(function () {
	            EZGUI.Compatibility.fixCache.call(game.load, uiAssets);
	
	            EZGUI.Theme.load(['assets/ui-theme/ui-theme.json'], function () {
	                menuScreen = EZGUI.create(_menu2.default, 'ui-theme');
	
	                callback();
	            });
	        });
	    },
	
	    menu: {
	        onStart: function onStart(cb) {
	            EZGUI.components.startBtn.on('click', function () {
	                cb();
	                menuScreen.visible = false;
	            });
	        }
	    }
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    id: 'menu',
	    component: 'Window',
	    // header: { position: { x: 0, y: 0 }, height: 40, text: 'HEADER' },
	    draggable: false,
	    position: { x: 20, y: 20 },
	    width: 344,
	    height: 200,
	
	    layout: [1, 3],
	    children: [{
	        id: 'label',
	        component: 'Label',
	        position: 'center',
	        text: 'WELCOME TO DUNGEON EXPLORER',
	        width: 340,
	        height: 50
	    }, null, {
	        id: 'startBtn',
	        component: 'Button',
	        position: 'center',
	        text: 'EXPLORE',
	        width: 100,
	        height: 40
	    }]
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _State3 = __webpack_require__(3);
	
	var _State4 = _interopRequireDefault(_State3);
	
	var _fonts = __webpack_require__(42);
	
	var _fonts2 = _interopRequireDefault(_fonts);
	
	var _ui = __webpack_require__(45);
	
	var _ui2 = _interopRequireDefault(_ui);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Menu = function (_State2) {
	    _inherits(Menu, _State2);
	
	    function Menu() {
	        _classCallCheck(this, Menu);
	
	        return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
	    }
	
	    _createClass(Menu, [{
	        key: 'create',
	        value: function create() {
	            var _this2 = this;
	
	            // this.titleText = this.createTitleText(this.world.centerX, 40);
	            // this.actionText = this.createActionText(this.world.centerX, 120);
	            // this.time.events.loop(1000, () => {
	            //     this.actionText.visible = Boolean(!this.actionText.visible);
	            // });
	            _ui2.default.menu.onStart(function () {
	                _this2.stateProvider.gameplay(_this2.state);
	            });
	        }
	
	        // createTitleText (x, y) {
	        //     return Fonts.menu(this.game, x, y, 'DUNGEON EXPLORER\r\nHEADER\r\nSTART', 8, 'center', this.world);
	        // }
	        //
	        // createActionText (x, y) {
	        //     return Fonts.menu(this.game, x, y, 'PRESS SPACE\r\nTO BEGIN EXPLORING', 8, 'center', this.world);
	        // }
	
	        // update () {
	        //     if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
	        //         this.stateProvider.gameplay(this.state);
	        //     }
	        // }
	
	    }]);
	
	    return Menu;
	}(_State4.default);
	
	exports.default = Menu;

/***/ }
/******/ ]);
//# sourceMappingURL=game.js.map