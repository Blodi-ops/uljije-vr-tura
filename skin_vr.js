// Garden Gnome Software - VR - Skin
// Pano2VR 7.1.11/21010
// Filename: manastiri_vr.ggsk
// Generated 2026-10-21T09:40:11

function pano2vrVrSkin(player,base) {
	player.addVariable('node_cloner_vr_hasUp', 2, false, { ignoreInState: 0  });
	player.addVariable('node_cloner_vr_hasDown', 2, false, { ignoreInState: 0  });
	player.addVariable('vis_info_hotspots', 0, "", { ignoreInState: 0  });
	player.addVariable('vis_image_hotspots', 0, "", { ignoreInState: 0  });
	player.addVariable('vis_video_file_hotspots', 0, "", { ignoreInState: 0  });
	player.addVariable('vis_video_url_hotspots', 0, "", { ignoreInState: 0  });
	var me=this;
	var skin=this;
	var flag=false;
	var vrSkinAdded=false;
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.vrSkinObj=this;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown={};
	this.elementMouseOver={};
	var i;
	var hs,el,els,elo,ela,geometry,material;
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.skinGroup);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.userData.ggId)) r.push(e);
			} else {
				if (e.userData.ggId==id) r.push(e);
			}
			if (e.children.length > 0) {
				for(var i=0;i<e.children.length;i++) {
					stack.push(e.children[i]);
				}
			}
		}
		return r;
	}
	
	this.posInSkin=function(el, clonerParent) {
		var curParent = el.parent;
		var pos = {x: el.position.x, y: el.position.y};
		while (curParent && curParent != me.skinGroup) {
			pos.x += curParent.position.x;
			pos.y += curParent.position.y;
			if (curParent.parent) {
				curParent = curParent.parent;
			} else {
				curParent = clonerParent
			}
		}
		return pos;
	}
	
	this._=function(text, params) {
		return player._(text, params);
	}
	this.languageChanged=function() {
		if (!me.skinGroup) return;
		var stack=[];
		stack.push(me.skinGroup);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.userData && e.userData.ggUpdateText) {
				e.userData.ggUpdateText();
			}
			for(var i=0;i<e.children.length;i++) {
				stack.push(e.children[i]);
			}
		}
	}
	player.addListener('languagechanged', this.languageChanged);
	this.getElementVrPosition = function(el, x, y) {
		var vrPos = {};
		var renderableEl = el.parent && (el.parent.type == 'Mesh' || el.parent.type == 'Group');
		switch (el.userData.hanchor) {
			case 0:
			vrPos.x = (renderableEl ? el.parent.position.x : 0) - ((renderableEl ? el.parent.userData.width : 800) / 200.0) + (x / 100.0) + (el.userData.width / 200.0);
			break;
			case 1:
			vrPos.x = (renderableEl ? el.parent.position.x : 0) + (x / 100.0);
			break;
			case 2:
			vrPos.x = (renderableEl ? el.parent.position.x : 0) + ((renderableEl ? el.parent.userData.width : 800) / 200.0) - (x / 100.0) - (el.userData.width / 200.0);
			break;
		}
		switch (el.userData.vanchor) {
			case 0:
			vrPos.y = (renderableEl ? el.parent.position.y : 0) + ((renderableEl ? el.parent.userData.height : 600) / 200.0) - (y / 100.0) - (el.userData.height / 200.0);
			break;
			case 1:
			vrPos.y = (renderableEl ? el.parent.position.y : 0) - (y / 100.0);
			break;
			case 2:
			vrPos.y = (renderableEl ? el.parent.position.y : 0) - ((renderableEl ? el.parent.userData.height : 600) / 200.0) + (y / 100.0) + (el.userData.height / 200.0);
			break;
		}
		vrPos.x += el.userData.curScaleOffX;
		vrPos.y += el.userData.curScaleOffY;
		return vrPos;
	}
	this.skin_nodechangeCallback = function() {
		me.ggUserdata=player.userdata;
	};
	this.addSkin=function() {
		if (me.vrSkinAdded) return;
		me.vrSkinAdded = true;
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		this.skinGroup=player.getSkinGroup();
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 250;
		el.userData.height = 500;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'thumbnails';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._thumbnails.material) me._thumbnails.material.opacity = v;
			me._thumbnails.visible = (v>0 && me._thumbnails.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._thumbnails.visible
			let parentEl = me._thumbnails.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._thumbnails.userData.opacity = v;
			v = v * me._thumbnails.userData.parentOpacity;
			me._thumbnails.userData.setOpacityInternal(v);
			for (let i = 0; i < me._thumbnails.children.length; i++) {
				let child = me._thumbnails.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._thumbnails.userData.parentOpacity = v;
			v = v * me._thumbnails.userData.opacity
			me._thumbnails.userData.setOpacityInternal(v);
			for (let i = 0; i < me._thumbnails.children.length; i++) {
				let child = me._thumbnails.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._thumbnails = el;
		el.userData.ggId="thumbnails";
		me._thumbnails.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getIsTour() == false))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._thumbnails.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._thumbnails.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._thumbnails.ggCurrentLogicStateVisible == 0) {
			me._thumbnails.visible=false;
			me._thumbnails.userData.visible=false;
				}
				else {
			me._thumbnails.visible=((!me._thumbnails.material && Number(me._thumbnails.userData.opacity>0)) || Number(me._thumbnails.material.opacity)>0)?true:false;
			me._thumbnails.userData.visible=true;
				}
			}
		}
		me._thumbnails.logicBlock_visible();
		me._thumbnails.userData.ggUpdatePosition=function (useTransition) {
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.translateX(0);
		el.translateY(2.33);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 250;
		el.userData.height = 34;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'node_cloner_vr';
		el.userData.x = 0;
		el.userData.y = 2.33;
		el.userData.hanchor = 1;
		el.userData.vanchor = 0;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._node_cloner_vr.material) me._node_cloner_vr.material.opacity = v;
			me._node_cloner_vr.visible = (v>0 && me._node_cloner_vr.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._node_cloner_vr.visible
			let parentEl = me._node_cloner_vr.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._node_cloner_vr.userData.opacity = v;
			v = v * me._node_cloner_vr.userData.parentOpacity;
			me._node_cloner_vr.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_cloner_vr.children.length; i++) {
				let child = me._node_cloner_vr.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._node_cloner_vr.userData.parentOpacity = v;
			v = v * me._node_cloner_vr.userData.opacity
			me._node_cloner_vr.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_cloner_vr.children.length; i++) {
				let child = me._node_cloner_vr.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._node_cloner_vr = el;
		el.userData.ggNumRepeat = 100;
		el.userData.ggCloneOffset = 0;
		el.userData.ggNumRows = 0;
		el.userData.ggNumCols = 0;
		el.userData.ggUpdating = false;
		el.userData.ggFilter = [];
		el.userData.ggInstances = [];
		el.userData.ggGoUp = function() {
			if (me._node_cloner_vr.userData.ggCloneOffset + me._node_cloner_vr.userData.ggNumRows <= me._node_cloner_vr.userData.ggNumFilterPassed) {
				me._node_cloner_vr.userData.ggCloneOffset += me._node_cloner_vr.userData.ggNumRows;
				me._node_cloner_vr.userData.ggCloneOffsetChanged = true;
				me._node_cloner_vr.userData.ggUpdate();
			}
		}
		el.userData.ggGoDown = function() {
			if (me._node_cloner_vr.userData.ggCloneOffset > 0) {
				me._node_cloner_vr.userData.ggCloneOffset -= me._node_cloner_vr.userData.ggNumRows;
				me._node_cloner_vr.userData.ggCloneOffset = Math.max(me._node_cloner_vr.userData.ggCloneOffset, 0);
				me._node_cloner_vr.userData.ggCloneOffsetChanged = true;
				me._node_cloner_vr.userData.ggUpdate();
			}
		}
		el.getFilteredNodes = function(tourNodes, filter) {
			var filteredNodes = [];
			for (var i = 0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j].trim()) == -1) passed = false;
					}
				}
				if (passed) {
					filteredNodes.push(nodeId);
				}
			}
			return filteredNodes;
		}
		el.userData.ggUpdate = function(filter) {
			if(me._node_cloner_vr.userData.ggUpdating == true) return;
			me._node_cloner_vr.userData.ggUpdating = true;
			var el=me._node_cloner_vr;
			var curNumRows = 0;
			var parentHeight = me._node_cloner_vr.parent.userData.height;
			me._node_cloner_vr.userData.offsetTop = (me._node_cloner_vr.parent.userData.height / 200.0) + me._node_cloner_vr.userData.y - (me._node_cloner_vr.userData.height / 200.0);
			curNumRows = Math.floor(((parentHeight - me._node_cloner_vr.userData.offsetTop) * me._node_cloner_vr.userData.ggNumRepeat / 100.0) / me._node_cloner_vr.userData.height);
			if (curNumRows < 1) curNumRows = 1;
			if (typeof filter=='object') {
				el.userData.ggFilter = filter;
			} else {
				filter = el.userData.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.userData.ggNumRows == curNumRows) && (el.userData.ggInstances.length > 0) && (filter.length === el.userData.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.userData.ggCurrentFilter[index] }) ) && (!me._node_cloner_vr.userData.ggCloneOffsetChanged)) {
				me._node_cloner_vr.userData.ggUpdating = false;
				return;
			} else {
				el.userData.ggNumCols = 1;
				el.userData.ggNumRows = curNumRows;
			var centerOffsetHor = 0;
			var centerOffsetVert = 0;
				me._node_cloner_vr.userData.ggCloneOffsetChanged = false;
			}
			el.userData.ggCurrentFilter = filter;
			el.userData.ggInstances = [];
			el.remove(...el.children);
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			var keepCloning = true;
			me._node_cloner_vr.userData.ggNumFilterPassed = 0;
			tourNodes = me._node_cloner_vr.getFilteredNodes(tourNodes, filter);
			me._node_cloner_vr.userData.ggNumFilterPassed = tourNodes.length;
			for (var i = 0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var nodeData = player.getNodeUserdata(nodeId);
				if (!keepCloning || i < me._node_cloner_vr.userData.ggCloneOffset) continue;
				var parameter={};
				parameter.top = -(centerOffsetVert / 100.0) - (row * me._node_cloner_vr.userData.height) / 100.0;
				parameter.left = (centerOffsetHor / 100.0) + (column * me._node_cloner_vr.userData.width) / 100.0;
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_node_cloner_vr_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.userData.ggInstances.push(inst);
				var bbox = new THREE.Box3().setFromObject(inst.__obj);
				var clonerPosInSkin = skin.posInSkin(me._node_cloner_vr, me.ggParent);
				if (bbox.min.x + clonerPosInSkin.x >= -4 && bbox.max.x + clonerPosInSkin.x <= 4 && bbox.min.y + clonerPosInSkin.y >= -3 && bbox.max.y + clonerPosInSkin.y <= 3) el.add(inst.__obj);
				row++;
				if (row >= el.userData.ggNumRows) {
					keepCloning = false;
				}
			}
			player.setVariableValue('node_cloner_vr_hasDown', me._node_cloner_vr.userData.ggCloneOffset > 0);
			player.setVariableValue('node_cloner_vr_hasUp', me._node_cloner_vr.userData.ggCloneOffset + me._node_cloner_vr.userData.ggNumRows < me._node_cloner_vr.userData.ggNumFilterPassed);
			me._node_cloner_vr.userData.ggNodeCount = me._node_cloner_vr.userData.ggNumFilterPassed;
			me._node_cloner_vr.userData.ggUpdating = false;
			player.triggerEvent('clonerchanged');
		}
		el.userData.ggFilter = [];
		el.userData.ggId="node_cloner_vr";
		me._node_cloner_vr.userData.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnails.add(me._node_cloner_vr);
		geometry = new THREE.PlaneGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'page_up_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'page_up_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(1.525);
		el.translateY(1.825);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'page_up';
		el.userData.x = 1.525;
		el.userData.y = 1.825;
		el.userData.hanchor = 2;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._page_up.material) me._page_up.material.opacity = v;
			me._page_up.visible = (v>0 && me._page_up.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._page_up.visible
			let parentEl = me._page_up.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._page_up.userData.opacity = v;
			v = v * me._page_up.userData.parentOpacity;
			me._page_up.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_up.children.length; i++) {
				let child = me._page_up.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._page_up.userData.parentOpacity = v;
			v = v * me._page_up.userData.opacity
			me._page_up.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_up.children.length; i++) {
				let child = me._page_up.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._page_up = el;
		el.userData.ggId="page_up";
		me._page_up.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('node_cloner_vr_hasDown') == false))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._page_up.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._page_up.ggCurrentLogicStatePosition = newLogicStatePosition;
				if (me._page_up.ggCurrentLogicStatePosition == 0) {
					var newPos = skin.getElementVrPosition(me._page_up, -50, 0);
					me._page_up.position.x = newPos.x;
					me._page_up.position.y = newPos.y;
				}
				else {
					var elPos = skin.getElementVrPosition(me._page_up, -50, 45);
					me._page_up.position.x = elPos.x;
					me._page_up.position.y = elPos.y;
				}
			}
		}
		me._page_up.logicBlock_position();
		me._page_up.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['page_up'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._page_up.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._page_up.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._page_up.ggCurrentLogicStateScaling == 0) {
					me._page_up.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._page_up.userData.transitions.length; i++) {
						if (me._page_up.userData.transitions[i].property == 'scale') {
							clearInterval(me._page_up.userData.transitions[i].interval);
							me._page_up.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._page_up.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._page_up.scale.set(transition_scale.startScale.x + (me._page_up.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._page_up.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._page_up.position.x = (me._page_up.position.x - me._page_up.userData.curScaleOffX) + scaleOffX;
						me._page_up.userData.curScaleOffX = scaleOffX;
						me._page_up.position.y = (me._page_up.position.y - me._page_up.userData.curScaleOffY) + scaleOffY;
						me._page_up.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._page_up.userData.transitions.splice(me._page_up.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._page_up.userData.transitions.push(transition_scale);
				}
				else {
					me._page_up.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._page_up.userData.transitions.length; i++) {
						if (me._page_up.userData.transitions[i].property == 'scale') {
							clearInterval(me._page_up.userData.transitions[i].interval);
							me._page_up.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._page_up.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._page_up.scale.set(transition_scale.startScale.x + (me._page_up.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._page_up.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._page_up.position.x = (me._page_up.position.x - me._page_up.userData.curScaleOffX) + scaleOffX;
						me._page_up.userData.curScaleOffX = scaleOffX;
						me._page_up.position.y = (me._page_up.position.y - me._page_up.userData.curScaleOffY) + scaleOffY;
						me._page_up.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._page_up.userData.transitions.splice(me._page_up.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._page_up.userData.transitions.push(transition_scale);
				}
			}
		}
		me._page_up.logicBlock_scaling();
		me._page_up.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('node_cloner_vr_hasUp') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._page_up.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._page_up.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._page_up.ggCurrentLogicStateVisible == 0) {
			me._page_up.visible=((!me._page_up.material && Number(me._page_up.userData.opacity>0)) || Number(me._page_up.material.opacity)>0)?true:false;
			me._page_up.userData.visible=true;
				}
				else {
			me._page_up.visible=false;
			me._page_up.userData.visible=false;
				}
			}
		}
		me._page_up.logicBlock_visible();
		me._page_up.userData.onclick=function (e) {
			skin.findElements('node_cloner_vr')[0].userData.ggGoUp();
		}
		me._page_up.userData.onmouseenter=function (e) {
			me.elementMouseOver['page_up']=true;
			me._page_up.logicBlock_scaling();
		}
		me._page_up.userData.ontouchend=function (e) {
			me._page_up.logicBlock_scaling();
		}
		me._page_up.userData.onmouseleave=function (e) {
			me.elementMouseOver['page_up']=false;
			me._page_up.logicBlock_scaling();
		}
		me._page_up.userData.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnails.add(me._page_up);
		geometry = new THREE.PlaneGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'page_down_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'page_down_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(1.525);
		el.translateY(2.275);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'page_down';
		el.userData.x = 1.525;
		el.userData.y = 2.275;
		el.userData.hanchor = 2;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._page_down.material) me._page_down.material.opacity = v;
			me._page_down.visible = (v>0 && me._page_down.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._page_down.visible
			let parentEl = me._page_down.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._page_down.userData.opacity = v;
			v = v * me._page_down.userData.parentOpacity;
			me._page_down.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_down.children.length; i++) {
				let child = me._page_down.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._page_down.userData.parentOpacity = v;
			v = v * me._page_down.userData.opacity
			me._page_down.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_down.children.length; i++) {
				let child = me._page_down.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._page_down = el;
		el.userData.ggId="page_down";
		me._page_down.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['page_down'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._page_down.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._page_down.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._page_down.ggCurrentLogicStateScaling == 0) {
					me._page_down.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._page_down.userData.transitions.length; i++) {
						if (me._page_down.userData.transitions[i].property == 'scale') {
							clearInterval(me._page_down.userData.transitions[i].interval);
							me._page_down.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._page_down.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._page_down.scale.set(transition_scale.startScale.x + (me._page_down.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._page_down.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._page_down.position.x = (me._page_down.position.x - me._page_down.userData.curScaleOffX) + scaleOffX;
						me._page_down.userData.curScaleOffX = scaleOffX;
						me._page_down.position.y = (me._page_down.position.y - me._page_down.userData.curScaleOffY) + scaleOffY;
						me._page_down.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._page_down.userData.transitions.splice(me._page_down.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._page_down.userData.transitions.push(transition_scale);
				}
				else {
					me._page_down.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._page_down.userData.transitions.length; i++) {
						if (me._page_down.userData.transitions[i].property == 'scale') {
							clearInterval(me._page_down.userData.transitions[i].interval);
							me._page_down.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._page_down.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._page_down.scale.set(transition_scale.startScale.x + (me._page_down.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._page_down.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._page_down.position.x = (me._page_down.position.x - me._page_down.userData.curScaleOffX) + scaleOffX;
						me._page_down.userData.curScaleOffX = scaleOffX;
						me._page_down.position.y = (me._page_down.position.y - me._page_down.userData.curScaleOffY) + scaleOffY;
						me._page_down.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._page_down.userData.transitions.splice(me._page_down.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._page_down.userData.transitions.push(transition_scale);
				}
			}
		}
		me._page_down.logicBlock_scaling();
		me._page_down.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('node_cloner_vr_hasDown') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._page_down.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._page_down.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._page_down.ggCurrentLogicStateVisible == 0) {
			me._page_down.visible=((!me._page_down.material && Number(me._page_down.userData.opacity>0)) || Number(me._page_down.material.opacity)>0)?true:false;
			me._page_down.userData.visible=true;
				}
				else {
			me._page_down.visible=false;
			me._page_down.userData.visible=false;
				}
			}
		}
		me._page_down.logicBlock_visible();
		me._page_down.userData.onclick=function (e) {
			skin.findElements('node_cloner_vr')[0].userData.ggGoDown();
		}
		me._page_down.userData.onmouseenter=function (e) {
			me.elementMouseOver['page_down']=true;
			me._page_down.logicBlock_scaling();
		}
		me._page_down.userData.ontouchend=function (e) {
			me._page_down.logicBlock_scaling();
		}
		me._page_down.userData.onmouseleave=function (e) {
			me.elementMouseOver['page_down']=false;
			me._page_down.logicBlock_scaling();
		}
		me._page_down.userData.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnails.add(me._page_down);
		me.skinGroup.add(me._thumbnails);
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.translateX(-3.275);
		el.translateY(2.275);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = '_close_skin';
		el.userData.x = -3.275;
		el.userData.y = 2.275;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me.__close_skin.material) me.__close_skin.material.opacity = v;
			me.__close_skin.visible = (v>0 && me.__close_skin.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me.__close_skin.visible
			let parentEl = me.__close_skin.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me.__close_skin.userData.opacity = v;
			v = v * me.__close_skin.userData.parentOpacity;
			me.__close_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me.__close_skin.children.length; i++) {
				let child = me.__close_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me.__close_skin.userData.parentOpacity = v;
			v = v * me.__close_skin.userData.opacity
			me.__close_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me.__close_skin.children.length; i++) {
				let child = me.__close_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me.__close_skin = el;
		el.userData.ggId="_close_skin";
		me.__close_skin.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'exit_vr_close_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'exit_vr_close_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(-0.44);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'exit_vr_close';
		el.userData.x = 0;
		el.userData.y = -0.44;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._exit_vr_close.material) me._exit_vr_close.material.opacity = v;
			me._exit_vr_close.visible = (v>0 && me._exit_vr_close.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._exit_vr_close.visible
			let parentEl = me._exit_vr_close.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._exit_vr_close.userData.opacity = v;
			v = v * me._exit_vr_close.userData.parentOpacity;
			me._exit_vr_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._exit_vr_close.children.length; i++) {
				let child = me._exit_vr_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._exit_vr_close.userData.parentOpacity = v;
			v = v * me._exit_vr_close.userData.opacity
			me._exit_vr_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._exit_vr_close.children.length; i++) {
				let child = me._exit_vr_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._exit_vr_close = el;
		el.userData.ggId="exit_vr_close";
		me._exit_vr_close.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['exit_vr_close'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._exit_vr_close.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._exit_vr_close.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._exit_vr_close.ggCurrentLogicStateScaling == 0) {
					me._exit_vr_close.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._exit_vr_close.userData.transitions.length; i++) {
						if (me._exit_vr_close.userData.transitions[i].property == 'scale') {
							clearInterval(me._exit_vr_close.userData.transitions[i].interval);
							me._exit_vr_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._exit_vr_close.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._exit_vr_close.scale.set(transition_scale.startScale.x + (me._exit_vr_close.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._exit_vr_close.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._exit_vr_close.position.x = (me._exit_vr_close.position.x - me._exit_vr_close.userData.curScaleOffX) + scaleOffX;
						me._exit_vr_close.userData.curScaleOffX = scaleOffX;
						me._exit_vr_close.position.y = (me._exit_vr_close.position.y - me._exit_vr_close.userData.curScaleOffY) + scaleOffY;
						me._exit_vr_close.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._exit_vr_close.userData.transitions.splice(me._exit_vr_close.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._exit_vr_close.userData.transitions.push(transition_scale);
				}
				else {
					me._exit_vr_close.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._exit_vr_close.userData.transitions.length; i++) {
						if (me._exit_vr_close.userData.transitions[i].property == 'scale') {
							clearInterval(me._exit_vr_close.userData.transitions[i].interval);
							me._exit_vr_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._exit_vr_close.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._exit_vr_close.scale.set(transition_scale.startScale.x + (me._exit_vr_close.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._exit_vr_close.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._exit_vr_close.position.x = (me._exit_vr_close.position.x - me._exit_vr_close.userData.curScaleOffX) + scaleOffX;
						me._exit_vr_close.userData.curScaleOffX = scaleOffX;
						me._exit_vr_close.position.y = (me._exit_vr_close.position.y - me._exit_vr_close.userData.curScaleOffY) + scaleOffY;
						me._exit_vr_close.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._exit_vr_close.userData.transitions.splice(me._exit_vr_close.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._exit_vr_close.userData.transitions.push(transition_scale);
				}
			}
		}
		me._exit_vr_close.logicBlock_scaling();
		me._exit_vr_close.userData.onclick=function (e) {
			player.exitVR();
			player.setVRSkinVisibility("0");
		}
		me._exit_vr_close.userData.onmouseenter=function (e) {
			me.elementMouseOver['exit_vr_close']=true;
			me._exit_vr_close.logicBlock_scaling();
		}
		me._exit_vr_close.userData.ontouchend=function (e) {
			me._exit_vr_close.logicBlock_scaling();
		}
		me._exit_vr_close.userData.onmouseleave=function (e) {
			me.elementMouseOver['exit_vr_close']=false;
			me._exit_vr_close.logicBlock_scaling();
		}
		me._exit_vr_close.userData.ggUpdatePosition=function (useTransition) {
		}
		me.__close_skin.add(me._exit_vr_close);
		geometry = new THREE.PlaneGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'close_skin_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'close_skin_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'close_skin';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._close_skin.material) me._close_skin.material.opacity = v;
			me._close_skin.visible = (v>0 && me._close_skin.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._close_skin.visible
			let parentEl = me._close_skin.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._close_skin.userData.opacity = v;
			v = v * me._close_skin.userData.parentOpacity;
			me._close_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me._close_skin.children.length; i++) {
				let child = me._close_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._close_skin.userData.parentOpacity = v;
			v = v * me._close_skin.userData.opacity
			me._close_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me._close_skin.children.length; i++) {
				let child = me._close_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._close_skin = el;
		el.userData.ggId="close_skin";
		me._close_skin.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['close_skin'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._close_skin.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._close_skin.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._close_skin.ggCurrentLogicStateScaling == 0) {
					me._close_skin.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._close_skin.userData.transitions.length; i++) {
						if (me._close_skin.userData.transitions[i].property == 'scale') {
							clearInterval(me._close_skin.userData.transitions[i].interval);
							me._close_skin.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._close_skin.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._close_skin.scale.set(transition_scale.startScale.x + (me._close_skin.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._close_skin.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._close_skin.position.x = (me._close_skin.position.x - me._close_skin.userData.curScaleOffX) + scaleOffX;
						me._close_skin.userData.curScaleOffX = scaleOffX;
						me._close_skin.position.y = (me._close_skin.position.y - me._close_skin.userData.curScaleOffY) + scaleOffY;
						me._close_skin.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._close_skin.userData.transitions.splice(me._close_skin.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._close_skin.userData.transitions.push(transition_scale);
				}
				else {
					me._close_skin.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._close_skin.userData.transitions.length; i++) {
						if (me._close_skin.userData.transitions[i].property == 'scale') {
							clearInterval(me._close_skin.userData.transitions[i].interval);
							me._close_skin.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._close_skin.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._close_skin.scale.set(transition_scale.startScale.x + (me._close_skin.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._close_skin.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._close_skin.position.x = (me._close_skin.position.x - me._close_skin.userData.curScaleOffX) + scaleOffX;
						me._close_skin.userData.curScaleOffX = scaleOffX;
						me._close_skin.position.y = (me._close_skin.position.y - me._close_skin.userData.curScaleOffY) + scaleOffY;
						me._close_skin.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._close_skin.userData.transitions.splice(me._close_skin.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._close_skin.userData.transitions.push(transition_scale);
				}
			}
		}
		me._close_skin.logicBlock_scaling();
		me._close_skin.userData.onclick=function (e) {
			player.setVRSkinVisibility("0");
		}
		me._close_skin.userData.onmouseenter=function (e) {
			me.elementMouseOver['close_skin']=true;
			me._close_skin.logicBlock_scaling();
		}
		me._close_skin.userData.ontouchend=function (e) {
			me._close_skin.logicBlock_scaling();
		}
		me._close_skin.userData.onmouseleave=function (e) {
			me.elementMouseOver['close_skin']=false;
			me._close_skin.logicBlock_scaling();
		}
		me._close_skin.userData.ggUpdatePosition=function (useTransition) {
		}
		me.__close_skin.add(me._close_skin);
		me.player.setVRHideSkinButton(me.__close_skin);
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.translateX(-3.275);
		el.translateY(2.275);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = '_open_skin';
		el.userData.x = -3.275;
		el.userData.y = 2.275;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me.__open_skin.material) me.__open_skin.material.opacity = v;
			me.__open_skin.visible = (v>0 && me.__open_skin.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me.__open_skin.visible
			let parentEl = me.__open_skin.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me.__open_skin.userData.opacity = v;
			v = v * me.__open_skin.userData.parentOpacity;
			me.__open_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me.__open_skin.children.length; i++) {
				let child = me.__open_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me.__open_skin.userData.parentOpacity = v;
			v = v * me.__open_skin.userData.opacity
			me.__open_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me.__open_skin.children.length; i++) {
				let child = me.__open_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me.__open_skin = el;
		el.userData.ggId="_open_skin";
		me.__open_skin.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'exit_vr_open_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAASpklEQVR4nO1deXgUVbb/3arq6iXpTkgIhE5MYtiDimyBCIIKBB9CAj5AUJGwuIzyueAniriBD0aH93TUmRGfCAHmyUxgFDCiA0EGBmXfFAJEAklIQgJZu0Mvle6674/uaipJr6GbBMzv+/r7qqpv1b3169vnnnvOuecCHehABzrQgQ78xkHaugHeQCnIoezxXUXCx1EKLQuqpYAWAAhgtIMYCYGRoULZkKxtlYSAtnWbPaHdEE0pyMF1k3sC4v0QaRqAPiDoAyDCz0fUg+IMgDNgyD4q2n8YmpV7rr2Q36ZE5+RMZRMtwhjY6QwQjAEQF+QqykCRB5ZsKFbxedOmbbQH+fl+o02I/ml9Rg/WRuYRQmdSQO+pXI1BsFVUW4XqenOj2SKKJqtdNFvtIg'+
	'ColSyjUbKMWsUw0RFqRWy0ko/S8ZynZxGgnFKy3s7RVffM3HouFO/lDTeU6IPZE/tRgtdByXQAjPw7i1UUz5YYTKfO15tOFNaZz5c2CBZBFAN5vopnmOT4cL5/90h1v+QITe8EnUalZJhmxUQQ+jdqZ5YNm7Ml/3rfyV/cEKL3rZmUxBBxBYAp8uuCIIoHT1cb/3XksuFIQa3ZZqNBlaccR8igXp3U9w3qokvtG63l+SakUwCbRMosTJu9uSiY9bpDSIk+mTOVbzBZXybAmwDU0vWKGouweXdZzc5DFcZAe21roVEyzP2DY7WTRsVFxUapeNlXZkLJUk0Y/8Ed0zYKoao/ZETvWz1hIMMw6wGkSNdKL5utOXnF1XuOVxntYtsoAyxDMGpAjHbq6ITo+C5qpeyrfFEUZ6bNyT0ainqDTjSlIAezJ84HIf8NgAcAk8Vu'+
	'/3J7cVXu3vK6tiK4OViGYOIIfeSM9MTOGhXLOi8LIHg59Ymtfw62WhhUovd+kaHlOGQTiodd105cqf98S+GVGkNjm6lW3hClU7BPZnaPGdE/xqWvU4KvbDZkjZi71RiseoJG9NHV/xHTyHDfAWQQ4BjoVm4+V7njYKUhWHWEEumpsbqnJ3XvKhswDyvExvED53x3JRjPDwrRP64an8hx3HYAvQCHLP79ulPlJRXmkA0uoUBCrJpf9EQ/vUx2F9hstvTh87YVX++zr5toJ8l7AcQDwNlio2nJqpNlRrPthmgTwYZWzTFvz7sjrneiVuO8VGqz2UZcL9nXRbRDXCj2wtmTj5ypaVi+9nS50NhORrxWglcwZHFWin5g707hzksFCrFxxPWIkVYTvfeLDK2CpbskmXzkTE3Df2Xnlwd70tFW4DhC3pzdT0724UY7HmjtAN'+
	'l8euoXKAVRsFgrkXy22Ghavvb0LUMyANhslC7Lzi8/W2w0OS8N5jhkU9q6ztkqog+uy3gOwGTAMfC9s+qXsptZXMTrY7mnZk/v1Py60CjSJatOlpVeNlsBgFA8fGBt5rOtqYP1XaQp9q2eMJAQkgOAFQRRfON/fy69UifYWlN5e0C8Ppb7vzUf3jZuzEidSsXjp/1HzfLvBZtIfymsNY0dHBvBsoQQYMzcjJ7bvthScCmQegLq0SdzpvLOaTUPAJ9+fa7iZlPh5JBI1nfryhNCkPlQeietLjy6ebmSCrOwcvO5SucpzzDM+pM5U/nm5bwhIKJNV4UFcNou9p64Up93qDJoM6cbDTnJAFBZWWWflvUSU28wdwYhLcjecbDSsPfElXrnacpVs+WlQOrzm+h9ayYlUULfAhy2i8+3FAZlxtQW8ERyaVkFAQCRErW7+z7f'+
	'UnjFZLE7TAmUvPXjqvGJ/tbpN9EMEf8Ap6nzy+3FVe3VduELvkgG6FWG0DJ399YYGu0bthdXOU81HMet8Ldev4g+mD2xH4CpgEPLyN1bXudvBe0JfpNMPaup3+wtr5O0EABT9q/OTPFUVg6/iKYEr0vHOXnF1e3F1BkIgkEyANhFio07S6qdp4Qw9HVv5SX4JPqn9Rk9nD4+XKq2CHuOVd10A2CwSJaw+9gVY0WNRdK2Zvy0PqOHr3s8eo0lsDYyD4QyALBlT1mNPcDJH8cxmPRQujZ97Eht8u23KSN1Wpb6+ULBAMMwCNeGswwhBAAsFitmPvUqW1pWAQDoEhNlra+rLW9stPndJrtIsXl3Wc0zk7vHAmAYkc4FsMjbPV6nkzk5U9kkk7WEAnpBEMXH3tlXGIiP746UXsoP33+jW1JivNJ36dDDahUw8ZHfofB8CQ'+
	'Bg5PDB+OzjpSgvr7S+uPDdS6dO/2r18QgXNEqGWf/OPd15BWEIUF6kUSZ4ixvx2qMTLcIYKe7i4OnqgBypd6T0Um7I/ihBpVK6xJMoijAYjHYg9NFD7npyxiPPovCCg+R773GQzCsUSEqMV27I/ijhsTkvlfxy6qxfZJusongov6pheP8YHQX0CSbzaADbPZX3LjocEUQAgH8duey3p4TjGHz4/hvdJJLLL1UKS5Z9VLn/4HGzyWIJOcmSTNbptBzgXiYfO3qifP5Lb6neWfxiV323rrxarWL+uOJN/YOZs4oaG+1+tfGHI5cNw/vH6ACAUOZReCHa42BIKYgzTAsWqygeKag1eyrbHJMeStdK4qL8UqUwYcq84h/27DfdSJJ9DXwmi0XcteeAacKUecXllyoFAEiI1/OZE9K1/tZ1tKDWZLE6/+UEo71Z9jwS7Qg4'+
	'dMTCnS0xmAIxgaaPHelq7JJlH1UajVdviLelNdqF0XhVXLr848vS+YNjR4U3f64n2GyUFpQYpA4YfyB7gkftw4t6J94vHZ06X2/yXK4lkm+/TQk4ZPL+g8f9/idcD65Hhdt34JhJunx7UmAD9y+FMm4Iud9TOc9EO0JnAQAnCusCIitSp2UBwGAw2tuTuPCkJ5ssFlpfb7ADQIQ2PCDT8c/n62SdkEnzVM7bhKWPdHC+tCEgU6hMT273JMtAgSZt9wtFZde4IaB9PJVzS7RzIOwDOEJnb1R8XKAI9oyvNTBZRbHW4HJ89PE0ILol+lD2+K5wRtpXVFvbpWG/PZAsoaLGxVGkk7sWcKtHi4SPI3B04up6c2NomucAz3PkyVnTI4em3h12saxC+PSzv9aUXqrw6hrzRTLHMqYXnp1pGXBnX73xqklcs25j7eFjJy2heo'+
	'eqOnOjc2kNRMLHAahoXsYt0ZRCS5z9wmwJndhgGQarV66IGzq4fxgApAFh48eN0k17fH7Jr4XFbv9JvkhmGXI19x+fKXomJ7m8JPePStPOeXrhxf2HQqMBma3XOKIUbvVwt6KDBXUVNjmXMoQCkzPStRLJEsLDwti3Fj3fxV15f8TFIw8/2NAzOamJP0/BceSVBU/FhOYtALOMIzl3crgfDHHtVzGHkOi77urrchnNX/B2aXVNnQ0A+vburmpe1l+ZnNKnh0K655XFvy+vra23AUDP5KSQGbbMwrXwNzl3cvg0k4YSZ86cc8nNP32wJF46LioqbWLYCWTgu1Rx2SXfVyxb5FqIVHDugt+WuVDAbY8mgMu4r1ayrQqy8Qcbv95mPPFzfpNZp90u4qNPsyW/XAuSa6rr7NPnLPCoXfz171vqi4qb/lCi2PSZwYaa51wc'+
	'ybmTw22PtoMYGedcQxNCohsb7fSxuS+XPvfUY1H3DBsUVlF5pfGLtTm1x07kW4CWJJvNFkyf+zJbctERu9Klc5S1qrqqhe1iyuPPljz/TFZU6pD+YUXFZcKa9Tm1R4/nh0zrkHdGO4j/RBMi69GqFsvHggqr1Uo/+GR19QefrK6WX29OstUqIHPGc82N9spFb68I35qb1+Tl6usbxHff/1MVgJD1YjnUsiV2cu7kcEsiQwWXuz06Qq1wVyaUaE6yyWyhcs9I755JNslov/DFp2M4LqR9wSc6R17jSM6dHG5bOCRrWyWAegCIjVYGFPp0vWhOcnVVrX3SjOeIRDIBvfrrufPn808VmACga5doxajhQ8O8PDLkiI1ycVTn5K4F3A+GBNS5gB1ROp5T8aEVHxLcahezX2Ikkm+LixWIc+D7x9Z/SuFZmPrweN2NaJ87aJ'+
	'QM0+na0ugznlZzeSPwjHSQHB8eUK8mDCMZVvyOJfakwhUVlxHA4eOz26yl0sC39du8BrPZIgLAyBGp2qhIXcCRsc2b3aztfiEp7ho3FOSMp3KeiWbIPumwf/dIt7FonlDntO3qdFpWo1L5bLgvPXnk8MGY8/jkhorKKpfdxWS2iDt27TUCgEKhIJMzx/ntgmoOjUpFIiIcP1S9w3nsN+5KjtRcOxP3eSrnpUczu6SjfskRGs/lWuL8hYtWwOGJHpZ6t9cfyR+SP/t4KbZuy2vhHN701Xcu8TF54jh/83q0QNrQARqnsxwXmk2WfOHO7jJuKN3lqZxHolOf+PpXAGUA0DtBp+E44vdfavuOPS4V5+3FL3TVasPc1uMvyVar1f79jn83NL//wKHj5otl5QIA9O6VrBo9Ki3gQVGrDWPeev2abeX7Hbtb1OMJHEdIrwSd'+
	'1JFKh2blekxP4ZFo54CYBwAqJcMM6tXJb/Gx+dvtRml2pu/Wlc/dtCpx9Ki0MLkY8UXykIH9REmF2573b4PVam0xyIiUYmtunqtXv/v2y7FpqQPUCgXrs1NoVCrywMhhmtxNqxKlNpSUlgtbcrf7HfI2sFena2kqKHZ6W9bstUEH1mWOg0i/BxyB5++vP9PCzuoJd6T0Un655o8JarWqRQANwzDUW3CL1JN5hQLVNXW2/5z+THGZzIYhh04Xxny1YWVi4m1xrkHJKgjUbDJ7k7VEp9OyjEyZMpstYiABNADw2sw+3aS4Dgpx3LCs3MDjOgCgWMXnEaAcAFL7RmsDUfNO5hdYZ2S9UCK3OzAMg8jICFan03ISyVargIzp7km+WFYuzHv2tVJPJAOAwXBVnPu7V0vPFBS6pthKnieRkRGcl08TkouKS60zsl4IiGSNkm'+
	'GGpHSWQhPKSjTqnd7K+/yLHViT+R4IfRUAVn5dWPHtj+X1vu6RQwpyHDv6Xm3Pnrer9N26KFjnSzbvycNS+9MV7y60V1ZcFr7L22P8+6Zcg8mpwvkCz3Pk4YwHtRPGj9YlxOt5tYr3+m6GhqvihaJS6/c7djds/uafBluAC30fGq6PcAY5ghL63rBZ37Q+yBFw5j+y4ywApqLGIjzz3uELrYmPbk8+vusFyxCsfG3w7c4EK6KdRW9feZp8ioJ7Zm49B0L/BgCxUSp+5N2dA9ZXbyWSAWDUgBitLIvNBn+SYfklcwnFcul42pjEaDaAydOtRjLLEEwdnSD5IykVyXKvNzjhF9GpWd+cArARAOK7qJUTRugj/bnvViMZACaO0EfK0kxs8jfTmN9ahEiZhQDMAPBoemLnKJ3Cq23hViQ5SqdgZ6Qndnaemmw22yv+3us3'+
	'0WmzNxcRSpYCgEbFsk9mdvfoVb4VSQaAJzO7x7jyLxG6NJAcHgGZPzVh/AcA8gFgRP+YiLGpXd2aJ8ePu0/bLbbLLUVyemqsTpZ3KT9MrfowkPsDMi3+ZWO+fW5Gz/2EkNkA2AE9O4XtP1XVUN9gazILO3L8pEWl4hGv76a8FUhOjA3jF89KiWNZQgAIDMH4AY997daT4gmtyj1xYG3GfFB8AjgWeC785HiJu9Q+Op02us5gcsq0m5NkrZpjVjzfPyEuRqMEAAoyf1jWlj8H+pxWEU0pyIF1GZuktGtni42m11f+XOo2Zwch0SIl6puRZF7BkOXP3BUv5VeiBF8NfWLrlNbkxGuVi4oQUJsNWQA9AgC9E7WaxVkperemVEqrGYilNxvJHEfI4qwUvSyJ1WGbDVmtTTzYkbzKDVokryI4q7A33tsmyaskdKRj8w8dCQ'+
	'ZlSIwN4xfN6qOXBj60pwSDEpxiZBuAwUBHyszm6EgCe7MlgZXg2H0i4zlQ/A9kaY03bC+u+qadpTXOGKmPnD6maVpjCrJg6Kwtf2nXaY3l8JSoe+POkurdx660aaLu+wbEaKfc7Im65TiZM5U3XRUWOJNetUg9v+twhdFkbfvU8yB0SZha9eFNmXpeDudmCn+AYzMFV52CIIqHTlc3/HDksuFoQW1A6839AccRMrBXJ80Dg7rohvSNDne3mYLNZnslGFqFL9zQ7UH2r85MceYgmgE324MUlBjMvxTWm34+X2cqKmsQAu3tGiXDJMWF83clR2ru7B6h6ZWgU7vdHgTYQEWy/JbbHqQ5flqf0YMR6VyGkie8bXhTaxBsFTVWoarO3Gi2iqLZahelhTlqnmPUSpZRKxmmc6RaERul5Dv52PBGJHSdyJAvbvkNb5ojJ2cq'+
	'm2AyjyaUeRQEo+GcXQYRpaDYSYn4ZYlGvfM3t4WTO1AKciB7Qg9HKgYmzbmAvS8C2ZQMOO0InRX3iSz5Ie3xrYUdm5L5gVtpm70OdKADHehAB37z+H/tagLB17jyKgAAAABJRU5ErkJggg==');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'exit_vr_open_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(-0.44);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'exit_vr_open';
		el.userData.x = 0;
		el.userData.y = -0.44;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._exit_vr_open.material) me._exit_vr_open.material.opacity = v;
			me._exit_vr_open.visible = (v>0 && me._exit_vr_open.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._exit_vr_open.visible
			let parentEl = me._exit_vr_open.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._exit_vr_open.userData.opacity = v;
			v = v * me._exit_vr_open.userData.parentOpacity;
			me._exit_vr_open.userData.setOpacityInternal(v);
			for (let i = 0; i < me._exit_vr_open.children.length; i++) {
				let child = me._exit_vr_open.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._exit_vr_open.userData.parentOpacity = v;
			v = v * me._exit_vr_open.userData.opacity
			me._exit_vr_open.userData.setOpacityInternal(v);
			for (let i = 0; i < me._exit_vr_open.children.length; i++) {
				let child = me._exit_vr_open.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._exit_vr_open = el;
		el.userData.ggId="exit_vr_open";
		me._exit_vr_open.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['exit_vr_open'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._exit_vr_open.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._exit_vr_open.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._exit_vr_open.ggCurrentLogicStateScaling == 0) {
					me._exit_vr_open.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._exit_vr_open.userData.transitions.length; i++) {
						if (me._exit_vr_open.userData.transitions[i].property == 'scale') {
							clearInterval(me._exit_vr_open.userData.transitions[i].interval);
							me._exit_vr_open.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._exit_vr_open.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._exit_vr_open.scale.set(transition_scale.startScale.x + (me._exit_vr_open.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._exit_vr_open.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._exit_vr_open.position.x = (me._exit_vr_open.position.x - me._exit_vr_open.userData.curScaleOffX) + scaleOffX;
						me._exit_vr_open.userData.curScaleOffX = scaleOffX;
						me._exit_vr_open.position.y = (me._exit_vr_open.position.y - me._exit_vr_open.userData.curScaleOffY) + scaleOffY;
						me._exit_vr_open.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._exit_vr_open.userData.transitions.splice(me._exit_vr_open.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._exit_vr_open.userData.transitions.push(transition_scale);
				}
				else {
					me._exit_vr_open.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._exit_vr_open.userData.transitions.length; i++) {
						if (me._exit_vr_open.userData.transitions[i].property == 'scale') {
							clearInterval(me._exit_vr_open.userData.transitions[i].interval);
							me._exit_vr_open.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._exit_vr_open.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._exit_vr_open.scale.set(transition_scale.startScale.x + (me._exit_vr_open.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._exit_vr_open.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._exit_vr_open.position.x = (me._exit_vr_open.position.x - me._exit_vr_open.userData.curScaleOffX) + scaleOffX;
						me._exit_vr_open.userData.curScaleOffX = scaleOffX;
						me._exit_vr_open.position.y = (me._exit_vr_open.position.y - me._exit_vr_open.userData.curScaleOffY) + scaleOffY;
						me._exit_vr_open.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._exit_vr_open.userData.transitions.splice(me._exit_vr_open.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._exit_vr_open.userData.transitions.push(transition_scale);
				}
			}
		}
		me._exit_vr_open.logicBlock_scaling();
		me._exit_vr_open.userData.onclick=function (e) {
			player.exitVR();
			player.setVRSkinVisibility("0");
		}
		me._exit_vr_open.userData.onmouseenter=function (e) {
			me.elementMouseOver['exit_vr_open']=true;
			me._exit_vr_open.logicBlock_scaling();
		}
		me._exit_vr_open.userData.ontouchend=function (e) {
			me._exit_vr_open.logicBlock_scaling();
		}
		me._exit_vr_open.userData.onmouseleave=function (e) {
			me.elementMouseOver['exit_vr_open']=false;
			me._exit_vr_open.logicBlock_scaling();
		}
		me._exit_vr_open.userData.ggUpdatePosition=function (useTransition) {
		}
		me.__open_skin.add(me._exit_vr_open);
		geometry = new THREE.PlaneGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'open_skin_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAMeElEQVR4nO2de0xUVx7Hv+fMnTsPnBF5KBkMGHEVQWtFxaVlaxXrZo0iuylG3KrU2nST7T+1aTfW9JmtTdrd9q/uNqlalEQbbFq1rk0saG1QKgqWKqCsGCHAIi+BwXlc7tyzf8wduMV5OwgzzOevey/nnHv5cjiP3/md3wGiRIkSJUqUKQ6Z6A/wBmMgl0vWz5IIn8wYDCowAwMMAEAAswPETAjMlAntK4pP3yUEbKK/2ROTRmjGQKoP//E3gLQaEssBkA6CdADT/SxiAAw3ANwAJVVMcpxdWXzq1mQRf0KFLisrVKXahLVwsCIQrAWQHOJXtIOhHCpytEXLl2/efMwR4vL9ZkKEvliaP08lkl2EsG0MMHlK1zcoiJ29dqF3wDpstUmSxe6QrHaHBA'+
	'A6jYrqNSqq01IaP12nTorX8HFGnvNUFgE6GCOlDo7tf2LbyVvj8Xt545EKXV2yMZMRvAFGtgCgyp/Z7JJ0s3XQUn97wFLX3G+93TYk2ARJCqR8LU/p3NnT+CVpsbrMudP1C1KMeq2G0jHJJBD2JXPQ93+780TDw/5O/vJIhK76omAOJdJHAJ5VPhcESapu7DX/UNM1WNN0zyqKLKTtKccRsmz+DN3Ty2YasxfGG3j+V6IzAF9JjL6e8/zxO6F8rzvGVejrZYX8kMX+KgHeBKBzPe/sswnHz7f3VVzuNAdaa4NFr6F09fIkQ8Gq5LikOC2v+JGVMPKePob/eNHmY8J4vX/chK46uCGLUloKIMP1rK3Lai8rb+n98eces0OamMGAihKsWppoKMxLiZ89U6dR/KhBkqRtOTtP1Y7He0MuNGMg1SUbXwYh/wDAA4DF5nAc'+
	'OdPSc6qyo3+iBB6LihJszDXFFq1LTdBrVSr5sQCCV7O3n/w01MPCkApdeSDfwHEoIQx/GnlW1z3w+Ynm7r7B4QkbWnkjzqhWvbgpLTF3SeLIeJ0RfC2KKM594aQ5VO8JmdC1B/+QOEy57wCyDHB2dJ8dv3X3++q7g6F6x3iyLjvJ+FJB2ixFh3lFLQ2vz9r5XXcoyg+J0Bf2r0/lOO4MgPmAsy3+4HB9R2unddw6l/EgJUnH79meaVK03U2iKK57ctfploct+6GFlkWuBDAbAG62mC3v7r/ebraKj2Q0EWoMOo6+vWtR8oJUg15+1CaKYu7Div1QQjubC3Ul5Jpcc6NvaN+hxg5heJL0eEHCqynZW5xhylowY5r8qEktDec+TDMStNCVB/INahU752qTa270Df29pKEj1JOOiYLjCHnz+Uyl2FeGHVgTbAc5dnrqF4'+
	'yBqFU45BL5ZovZsu9QY8SIDACiyNj7JQ0dN1vMFvnRco5DCWPBVU6V7yQPsn5u/ssAdgPOjm/vZ3VtVnt4NxfucEgMVdd6hlYuSphmjFFzBFjYVpfevf/4zcuBlhVwja46uCELDP8EnEO4Dw7XdwxZHWHZ8fmD2SpKHxyu7xBkUwEB+7jq4IasQMsJSOjrZYW8PK3mAeDf39zqDLchXDC0dlqFz47fuivf8pTS0utlhbzXTGMISGjLfWE3ZNtFZV33QPnluyGbOU12vq++O1hZ1z0g32bct9peCSS/30JXfVEwhxH2FuC0XXx+ojkkM6Zw4vMTzd0Wm8NpSmDkrQv716f6m9dvoSmRPoRs6jxypqVnstouxpO+wWHH0TMtPfKtnuO4j/zN65fQ1SUbMwEUAs5RxqnKjv7APzMy+Layo7+ty2qXb5/96eCmDK8ZZDyu'+
	'sSlxLj85r8vKW3r9MXUuW5qpXbJ4odaf8icLddcabTVX623e0jgkhmMVrb2vFC0wASCEsjcAPOerbJ9CXyzNnwcHtgDA/3ptwo9Xe/zqANeueTJm144tCf6knSzsP/Rljy+hAeD81W5z0e9TBXmlpuhiaf47vhZ8fTYdKpHscqU78WN7nyNyJn9B45AYjp9v75NvKZXYC77yeJ1OlpUVquZY7K0MMAmCJP35napmf9f4sh7P0D62KLyajl+uN9pqf27wWaMB5xpk6TtPpPFqQgnQcUevSfHmN+K16Ui1CWtdfhfVjb0BLaTW/tzg90eHIxa7JF1u6Bl6ckmikQGmFIs1D8AZT+m9Nx0OVuS6/KGmKyxWSh4lZxWaEEa3ekvrUWjGQGQ3LdjsklTTdM8auk+MDGqb7llsdvm/nCDPm2XPo9BOh0OnL9zN1kFLJJlAQ4'+
	'UoMtbUOuiqgLMvlWyY5ymtl6ZDWu26qr89YPGcbmpzrVmhDSGrPaXzLLTTdRYAUNfcH202PPDL7X5FJaQ5ntJ56wzTXRe324Yi3hQaLHfaR7UhYOme0rkVWu4I0wGn6+yj8o8LRyx2Sbo3KIjybbqnDtGt0JdL1s+C7Gnf2WuP1mYfdPaNaBQra/cAboWWCD/ied87YB0eh2+LKHr6RzVSaqfEU9NhcF1bbdFmwxdW+6hGSu2UuJ2Cy7ufAAAWe3ALr1mPZ2iXLM4IK1tH3bXgzAZWhUYqMP+Fdm0xG1tIIDyTlxuWZtKghBZG3d+U2ikJyoEmSuC4rdEEMLuaDp1GFdQf4/uKyvtdXX1hta5Ydy04a6OO50Y0IoDbhRG3QjtAzFReu9IHKXSkm0mVKCujA8St0G5FJGT0r6LTPrB9LMoYdIotdkrtlLgVkTKh3XUd'+
	'P12nDv2nRRYJsaMaKbVT4lboFcWn7wIYAICkeE1Ark9TkaS4EY36Ze0ewFPTweQN7Igz8pyWjzYfntBrKJ0xujX6hqfdXN4EvOG6mDt7WrRWe2BO8qg2DOSGp3SehaakynW5JC1W5zHdFOexubH60TupylM6LzWannNdZc6drvecbmqzOE2hDWPnPKXzKHT29m/+C6AdABakGPUcRyZNEJXJAscRMj/F6Ppvb1tZfMqjt5JHoeUOsRwAtBpKl82fEW0+xpA1f8ZomAqGCm/bmr2PJlTkqOvy6WUzjaH6wEhhjUITRqQj3tJ69VRq0fLlcyz2DgaYshfGG7Q87Yq6hDnRayhdkZHg2hrX3qrXVXhL71XozZuPOS59sakUhP2N5ynNW5Fk+M+FjgFveVxEupl09fIkA68mFAAYYaW+4jX5nIg4OLYfgAQABauS41Q02i'+
	'eqKEHBquQ4+VaSKDngK49P/+gntp28denQxi/ByNakOC3/1OMJhnO13T59pMvPXrjf3R1uZtJGv2rzqqWJBkUUm6P+BMPyy+OfMOxjwFYA2Lw2Nd6fCDI1V+t9es+HIypKUJiXEi/fMiaRff7k88uGkV38bT2AYwAwe6ZOsyHXFBvcZ4Y/G3NNsYowE1/5G2nMb2ORxOjrAKwAsHVdakKcUR3U9uZwJs6oVhWtS3V18BZRFF/zN6/fQuc8f/wOYeQ9ANBrVaoXN6UlBvidYc+Lm9ISR+IvEfZeIDE8AjJ/6mP4jwE0AEDuksTpz2TPmjKTmHXZSUZF3KWGGJ32k0DyByT0os3HBEmStgEQAOAvBfNmpSTpIt6EmpoUw79UkOZy9RIowXOBxsgL2KCfs/NULQheBQCep3TP9kyTQcdF7MKAQcfRPTvSTa6gVgxk94od'+
	'J68GWk5QAmVvP/kpI/gacI5C3t61KJlXR95MhldT8vauRcnJiXoN4AzTtnLHiX8FU1ZQQhMCJoooBlgNACxINej3FmeYIsmUynGE7C3OMCmCWF0RRRQHG3gwGrzKDQ8EryK4qXYM/25Cgle5iIZj849ogEEFqUkx/J4d6SZXm4zJFGDQhdyMnAawHIiGzBxLNAhsuAWBdeE8fSL/r3IksZGwxkfPtPR8O8nCGuc/ZYrdsvbXYY0ZyO6VO078a1KHNVbiKVD3sYrW3vNXuyc0UPfTSxMNz4Z7oG4l18sKect9Ybcc9OqB0PPnrnSaLfaJDz0Pwt6N0Wk/CcvQ80rkwxQ+hPMwhZF3CoIkXW7sHTpb0zVY23Qv5PvNOY6QrPkz9GuWzTSuWBg/zd1hCqIovhaKUYUvHulM7qeDmzLkGERFcHM8SFProPVa84Dll9v9lj'+
	'vtQ0KgtV2voXRO8jT+sbmx+sVp0/XzU4w6t8eDAEeZRPZF3PEgY7lYmj+PSuwFysh2bwfe3BsUxM4+u9DTbx222iXJandIro05Op6jOo2K6jSUJsTq1ElxGn6GjwNvJMIOS5QciPgDb8ZSVlaoSrFY8wijW0GQB3l2GULawFDBiHSkVa+rmHJHOLmDMZBLJRvmOUMx0Bx5A/tCBHIoGdDodJ2VqiQVOZvz3Mnm6KFkfhBJx+xFiRIlSpQoU57/A2Yaijkb6ZgvAAAAAElFTkSuQmCC');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'open_skin_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'open_skin';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.050);
		el.renderOrder = 5;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._open_skin.material) me._open_skin.material.opacity = v;
			me._open_skin.visible = (v>0 && me._open_skin.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._open_skin.visible
			let parentEl = me._open_skin.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._open_skin.userData.opacity = v;
			v = v * me._open_skin.userData.parentOpacity;
			me._open_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me._open_skin.children.length; i++) {
				let child = me._open_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._open_skin.userData.parentOpacity = v;
			v = v * me._open_skin.userData.opacity
			me._open_skin.userData.setOpacityInternal(v);
			for (let i = 0; i < me._open_skin.children.length; i++) {
				let child = me._open_skin.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._open_skin = el;
		el.userData.ggId="open_skin";
		me._open_skin.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['open_skin'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._open_skin.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._open_skin.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._open_skin.ggCurrentLogicStateScaling == 0) {
					me._open_skin.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._open_skin.userData.transitions.length; i++) {
						if (me._open_skin.userData.transitions[i].property == 'scale') {
							clearInterval(me._open_skin.userData.transitions[i].interval);
							me._open_skin.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._open_skin.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._open_skin.scale.set(transition_scale.startScale.x + (me._open_skin.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._open_skin.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._open_skin.position.x = (me._open_skin.position.x - me._open_skin.userData.curScaleOffX) + scaleOffX;
						me._open_skin.userData.curScaleOffX = scaleOffX;
						me._open_skin.position.y = (me._open_skin.position.y - me._open_skin.userData.curScaleOffY) + scaleOffY;
						me._open_skin.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._open_skin.userData.transitions.splice(me._open_skin.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._open_skin.userData.transitions.push(transition_scale);
				}
				else {
					me._open_skin.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._open_skin.userData.transitions.length; i++) {
						if (me._open_skin.userData.transitions[i].property == 'scale') {
							clearInterval(me._open_skin.userData.transitions[i].interval);
							me._open_skin.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._open_skin.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._open_skin.scale.set(transition_scale.startScale.x + (me._open_skin.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._open_skin.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._open_skin.position.x = (me._open_skin.position.x - me._open_skin.userData.curScaleOffX) + scaleOffX;
						me._open_skin.userData.curScaleOffX = scaleOffX;
						me._open_skin.position.y = (me._open_skin.position.y - me._open_skin.userData.curScaleOffY) + scaleOffY;
						me._open_skin.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._open_skin.userData.transitions.splice(me._open_skin.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._open_skin.userData.transitions.push(transition_scale);
				}
			}
		}
		me._open_skin.logicBlock_scaling();
		me._open_skin.userData.onclick=function (e) {
			player.setVRSkinVisibility("1");
		}
		me._open_skin.userData.onmouseenter=function (e) {
			me.elementMouseOver['open_skin']=true;
			me._open_skin.logicBlock_scaling();
		}
		me._open_skin.userData.ontouchend=function (e) {
			me._open_skin.logicBlock_scaling();
		}
		me._open_skin.userData.onmouseleave=function (e) {
			me.elementMouseOver['open_skin']=false;
			me._open_skin.logicBlock_scaling();
		}
		me._open_skin.userData.ggUpdatePosition=function (useTransition) {
		}
		me.__open_skin.add(me._open_skin);
		me.player.setVRShowSkinButton(me.__open_skin);
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.translateX(-4.74);
		el.translateY(1.81);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 657;
		el.userData.height = 138;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'vr_naslovi';
		el.userData.x = -4.74;
		el.userData.y = 1.81;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._vr_naslovi.material) me._vr_naslovi.material.opacity = v;
			me._vr_naslovi.visible = (v>0 && me._vr_naslovi.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._vr_naslovi.visible
			let parentEl = me._vr_naslovi.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vr_naslovi.userData.opacity = v;
			v = v * me._vr_naslovi.userData.parentOpacity;
			me._vr_naslovi.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_naslovi.children.length; i++) {
				let child = me._vr_naslovi.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vr_naslovi.userData.parentOpacity = v;
			v = v * me._vr_naslovi.userData.opacity
			me._vr_naslovi.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_naslovi.children.length; i++) {
				let child = me._vr_naslovi.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vr_naslovi = el;
		el.userData.ggId="vr_naslovi";
		me._vr_naslovi.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(6, 0.72, 5, 5 );
		geometry.name = 'vr_traka_gore_telo_geometry';
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.0862745, 0.0784314, 0.0666667).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'vr_traka_gore_telo_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.6;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._vr_traka_gore_telo.material.opacity = v * me._vr_traka_gore_telo.userData.backgroundColorAlpha;
			if (me._vr_traka_gore_telo.userData.ggSubElement) {
				me._vr_traka_gore_telo.userData.ggSubElement.material.opacity = v
				me._vr_traka_gore_telo.userData.ggSubElement.visible = (v>0 && me._vr_traka_gore_telo.userData.visible);
			}
			me._vr_traka_gore_telo.visible = (v>0 && me._vr_traka_gore_telo.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._vr_traka_gore_telo.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._vr_traka_gore_telo.userData.backgroundColorAlpha = v;
			me._vr_traka_gore_telo.userData.setOpacity(me._vr_traka_gore_telo.userData.opacity);
		}
		el.translateX(-0.285);
		el.translateY(0.33);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 600;
		el.userData.height = 72;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'vr_traka_gore_telo';
		el.userData.x = -0.285;
		el.userData.y = 0.33;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.050);
		el.renderOrder = 5;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._vr_traka_gore_telo.visible
			let parentEl = me._vr_traka_gore_telo.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vr_traka_gore_telo.userData.opacity = v;
			v = v * me._vr_traka_gore_telo.userData.parentOpacity;
			me._vr_traka_gore_telo.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_traka_gore_telo.children.length; i++) {
				let child = me._vr_traka_gore_telo.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vr_traka_gore_telo.userData.parentOpacity = v;
			v = v * me._vr_traka_gore_telo.userData.opacity
			me._vr_traka_gore_telo.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_traka_gore_telo.children.length; i++) {
				let child = me._vr_traka_gore_telo.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vr_traka_gore_telo = el;
		el.userData.ggId="vr_traka_gore_telo";
		me._vr_traka_gore_telo.userData.ggUpdatePosition=function (useTransition) {
		}
		me._vr_naslovi.add(me._vr_traka_gore_telo);
		geometry = new THREE.PlaneGeometry(0.57, 0.72, 5, 5 );
		geometry.name = 'vr_traka_gore_kapa_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAACQCAYAAADUUT/0AAABcklEQVR4nO3RAQmDABQA0e8aCMOMi2RGEVbBEoJ4vJfg4JaZme277sNrHef/93k6gnsYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRk'+
	'YYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkhJERRkYYGWFkxAV1wAUgugmx0gAAAABJRU5ErkJggg==');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'vr_traka_gore_kapa_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(3);
		el.translateY(0.33);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 57;
		el.userData.height = 72;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'vr_traka_gore_kapa';
		el.userData.x = 3;
		el.userData.y = 0.33;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.060);
		el.renderOrder = 6;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._vr_traka_gore_kapa.material) me._vr_traka_gore_kapa.material.opacity = v;
			me._vr_traka_gore_kapa.visible = (v>0 && me._vr_traka_gore_kapa.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._vr_traka_gore_kapa.visible
			let parentEl = me._vr_traka_gore_kapa.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vr_traka_gore_kapa.userData.opacity = v;
			v = v * me._vr_traka_gore_kapa.userData.parentOpacity;
			me._vr_traka_gore_kapa.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_traka_gore_kapa.children.length; i++) {
				let child = me._vr_traka_gore_kapa.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vr_traka_gore_kapa.userData.parentOpacity = v;
			v = v * me._vr_traka_gore_kapa.userData.opacity
			me._vr_traka_gore_kapa.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_traka_gore_kapa.children.length; i++) {
				let child = me._vr_traka_gore_kapa.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vr_traka_gore_kapa = el;
		el.userData.ggId="vr_traka_gore_kapa";
		me._vr_traka_gore_kapa.userData.ggUpdatePosition=function (useTransition) {
		}
		me._vr_naslovi.add(me._vr_traka_gore_kapa);
		geometry = new THREE.PlaneGeometry(5.65, 0.72, 5, 5 );
		geometry.name = 'vr_naslov_gore_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'vr_naslov_gore_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._vr_naslov_gore.material.opacity = v;
			if (me._vr_naslov_gore.userData.hasScrollbar) {
				me._vr_naslov_gore.userData.scrollbar.material.opacity = v;
				me._vr_naslov_gore.userData.scrollbarBg.material.opacity = v;
			}
			if (me._vr_naslov_gore.userData.ggSubElement) {
				me._vr_naslov_gore.userData.ggSubElement.material.opacity = v
				me._vr_naslov_gore.userData.ggSubElement.visible = (v>0 && me._vr_naslov_gore.userData.visible);
			}
			me._vr_naslov_gore.visible = (v>0 && me._vr_naslov_gore.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._vr_naslov_gore.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._vr_naslov_gore.userData.backgroundColorAlpha = v;
			me._vr_naslov_gore.userData.setOpacity(me._vr_naslov_gore.userData.opacity);
		}
		el.translateX(-0.19);
		el.translateY(0.33);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 565;
		el.userData.height = 72;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'vr_naslov_gore';
		el.userData.x = -0.19;
		el.userData.y = 0.33;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.070);
		el.renderOrder = 7;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._vr_naslov_gore.visible
			let parentEl = me._vr_naslov_gore.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vr_naslov_gore.userData.opacity = v;
			v = v * me._vr_naslov_gore.userData.parentOpacity;
			me._vr_naslov_gore.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_naslov_gore.children.length; i++) {
				let child = me._vr_naslov_gore.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vr_naslov_gore.userData.parentOpacity = v;
			v = v * me._vr_naslov_gore.userData.opacity
			me._vr_naslov_gore.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_naslov_gore.children.length; i++) {
				let child = me._vr_naslov_gore.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vr_naslov_gore = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(1, 1, 1).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0.945098, 0.901961, 0.811765).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 1130;
		canvas.height = 144;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._vr_naslov_gore.userData.totalHeightCanv = 2 * (3);
			me._vr_naslov_gore.userData.textLines = [];
			var ctx = me._vr_naslov_gore.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._vr_naslov_gore.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._vr_naslov_gore.userData.textLines.push(line);
					line = '';
					me._vr_naslov_gore.userData.totalHeightCanv += me._vr_naslov_gore.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._vr_naslov_gore.userData.width - 0 - (scrollbar ? 25 : 0))) && i > 0) {
					me._vr_naslov_gore.userData.textLines.push(line);
					line = words[i];
					me._vr_naslov_gore.userData.totalHeightCanv += me._vr_naslov_gore.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._vr_naslov_gore.userData.textLines.push(line);
			me._vr_naslov_gore.userData.totalHeightCanv += me._vr_naslov_gore.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._vr_naslov_gore.userData.textCanvas;
			var ctx = me._vr_naslov_gore.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._vr_naslov_gore.userData.textColor.r * 255 + ', ' + me._vr_naslov_gore.userData.textColor.g * 255 + ', ' + me._vr_naslov_gore.userData.textColor.b * 255 + ', ' + me._vr_naslov_gore.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = 2 * 0;
			ctx.textAlign = 'left';
			var y = 2 * 3;
			y += (canv.height - me._vr_naslov_gore.userData.totalHeightCanv - (2 * 0)) / 2;
			for (var i = 0; i < me._vr_naslov_gore.userData.textLines.length; i++) {
				var curTextLine = me._vr_naslov_gore.userData.textLines[i];
				var curTextLineBase = me._vr_naslov_gore.userData.textLines[i];
				if ((ctx.measureText(curTextLine).width + (2 * 0)) > canv.width) {
					var cutChars = 0;
					do {
						cutChars++;
						curTextLine = curTextLineBase.substring(0, curTextLineBase.length - cutChars) + '...';
					} while (cutChars < curTextLineBase.length && (ctx.measureText(curTextLine).width + (2 * 0)) > canv.width);
				}
				ctx.fillText(curTextLine, x, y);
				y += me._vr_naslov_gore.userData.lineHeightCanv;
			}
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'vr_naslov_gore_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._vr_naslov_gore.material.map) {
				me._vr_naslov_gore.material.map.dispose();
			}
			me._vr_naslov_gore.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._vr_naslov_gore.children.length; i++) {
				let child = me._vr_naslov_gore.children[i];
				if (child.name.includes('scrollbar')) me._vr_naslov_gore.remove(child);
			}
			var canv = me._vr_naslov_gore.userData.textCanvas;
			var ctx = me._vr_naslov_gore.userData.textCanvasContext;
			ctx.font = 'bold 72px Verdana';
			me._vr_naslov_gore.userData.lineHeightCanv = 72 * 1.2;
			me._vr_naslov_gore.userData.textLines = [];
			me._vr_naslov_gore.userData.textLines.push(me._vr_naslov_gore.userData.ggText);
			me._vr_naslov_gore.userData.totalHeightCanv = 2 * (3);
			me._vr_naslov_gore.userData.totalHeightCanv += me._vr_naslov_gore.userData.lineHeightCanv;
			me._vr_naslov_gore.userData.boxWidthCanv = 2 * me._vr_naslov_gore.userData.width;
			me._vr_naslov_gore.userData.boxHeightCanv = 2 * me._vr_naslov_gore.userData.height;
			me._vr_naslov_gore.userData.hasScrollbar = false;
			canv.width = me._vr_naslov_gore.userData.boxWidthCanv;
			canv.height = me._vr_naslov_gore.userData.boxHeightCanv;
			ctx.font = 'bold 72px Verdana';
			me._vr_naslov_gore.userData.ggPaintCanvasText();
		}
		me._vr_naslov_gore.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(player.getNodeUserdata('_master').title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._vr_naslov_gore.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._vr_naslov_gore.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._vr_naslov_gore.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._vr_naslov_gore.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._vr_naslov_gore.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._vr_naslov_gore.userData.textColorAlpha = v;
		}
		el.userData.ggId="vr_naslov_gore";
		me._vr_naslov_gore.userData.ggUpdatePosition=function (useTransition) {
		}
		me._vr_naslovi.add(me._vr_naslov_gore);
		geometry = new THREE.PlaneGeometry(6.57, 0.02, 5, 5 );
		geometry.name = 'vr_traka_gore_linija_gore_geometry';
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.788235, 0.627451, 0.305882).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'vr_traka_gore_linija_gore_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.85098;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._vr_traka_gore_linija_gore.material.opacity = v * me._vr_traka_gore_linija_gore.userData.backgroundColorAlpha;
			if (me._vr_traka_gore_linija_gore.userData.ggSubElement) {
				me._vr_traka_gore_linija_gore.userData.ggSubElement.material.opacity = v
				me._vr_traka_gore_linija_gore.userData.ggSubElement.visible = (v>0 && me._vr_traka_gore_linija_gore.userData.visible);
			}
			me._vr_traka_gore_linija_gore.visible = (v>0 && me._vr_traka_gore_linija_gore.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._vr_traka_gore_linija_gore.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._vr_traka_gore_linija_gore.userData.backgroundColorAlpha = v;
			me._vr_traka_gore_linija_gore.userData.setOpacity(me._vr_traka_gore_linija_gore.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0.68);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 657;
		el.userData.height = 2;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'vr_traka_gore_linija_gore';
		el.userData.x = 0;
		el.userData.y = 0.68;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.080);
		el.renderOrder = 8;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._vr_traka_gore_linija_gore.visible
			let parentEl = me._vr_traka_gore_linija_gore.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vr_traka_gore_linija_gore.userData.opacity = v;
			v = v * me._vr_traka_gore_linija_gore.userData.parentOpacity;
			me._vr_traka_gore_linija_gore.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_traka_gore_linija_gore.children.length; i++) {
				let child = me._vr_traka_gore_linija_gore.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vr_traka_gore_linija_gore.userData.parentOpacity = v;
			v = v * me._vr_traka_gore_linija_gore.userData.opacity
			me._vr_traka_gore_linija_gore.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_traka_gore_linija_gore.children.length; i++) {
				let child = me._vr_traka_gore_linija_gore.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vr_traka_gore_linija_gore = el;
		el.userData.ggId="vr_traka_gore_linija_gore";
		me._vr_traka_gore_linija_gore.userData.ggUpdatePosition=function (useTransition) {
		}
		me._vr_naslovi.add(me._vr_traka_gore_linija_gore);
		geometry = new THREE.PlaneGeometry(6.57, 0.02, 5, 5 );
		geometry.name = 'vr_traka_gore_linija_dole_geometry';
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.788235, 0.627451, 0.305882).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'vr_traka_gore_linija_dole_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.85098;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._vr_traka_gore_linija_dole.material.opacity = v * me._vr_traka_gore_linija_dole.userData.backgroundColorAlpha;
			if (me._vr_traka_gore_linija_dole.userData.ggSubElement) {
				me._vr_traka_gore_linija_dole.userData.ggSubElement.material.opacity = v
				me._vr_traka_gore_linija_dole.userData.ggSubElement.visible = (v>0 && me._vr_traka_gore_linija_dole.userData.visible);
			}
			me._vr_traka_gore_linija_dole.visible = (v>0 && me._vr_traka_gore_linija_dole.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._vr_traka_gore_linija_dole.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._vr_traka_gore_linija_dole.userData.backgroundColorAlpha = v;
			me._vr_traka_gore_linija_dole.userData.setOpacity(me._vr_traka_gore_linija_dole.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.02);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 657;
		el.userData.height = 2;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'vr_traka_gore_linija_dole';
		el.userData.x = 0;
		el.userData.y = -0.02;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.090);
		el.renderOrder = 9;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._vr_traka_gore_linija_dole.visible
			let parentEl = me._vr_traka_gore_linija_dole.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vr_traka_gore_linija_dole.userData.opacity = v;
			v = v * me._vr_traka_gore_linija_dole.userData.parentOpacity;
			me._vr_traka_gore_linija_dole.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_traka_gore_linija_dole.children.length; i++) {
				let child = me._vr_traka_gore_linija_dole.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vr_traka_gore_linija_dole.userData.parentOpacity = v;
			v = v * me._vr_traka_gore_linija_dole.userData.opacity
			me._vr_traka_gore_linija_dole.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_traka_gore_linija_dole.children.length; i++) {
				let child = me._vr_traka_gore_linija_dole.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vr_traka_gore_linija_dole = el;
		el.userData.ggId="vr_traka_gore_linija_dole";
		me._vr_traka_gore_linija_dole.userData.ggUpdatePosition=function (useTransition) {
		}
		me._vr_naslovi.add(me._vr_traka_gore_linija_dole);
		geometry = new THREE.PlaneGeometry(4.2, 0.57, 5, 5 );
		geometry.name = 'vr_traka_dole_telo_geometry';
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.0862745, 0.0784314, 0.0666667).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'vr_traka_dole_telo_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.6;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._vr_traka_dole_telo.material.opacity = v * me._vr_traka_dole_telo.userData.backgroundColorAlpha;
			if (me._vr_traka_dole_telo.userData.ggSubElement) {
				me._vr_traka_dole_telo.userData.ggSubElement.material.opacity = v
				me._vr_traka_dole_telo.userData.ggSubElement.visible = (v>0 && me._vr_traka_dole_telo.userData.visible);
			}
			me._vr_traka_dole_telo.visible = (v>0 && me._vr_traka_dole_telo.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._vr_traka_dole_telo.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._vr_traka_dole_telo.userData.backgroundColorAlpha = v;
			me._vr_traka_dole_telo.userData.setOpacity(me._vr_traka_dole_telo.userData.opacity);
		}
		el.translateX(-1.185);
		el.translateY(-0.405);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 420;
		el.userData.height = 57;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'vr_traka_dole_telo';
		el.userData.x = -1.185;
		el.userData.y = -0.405;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.100);
		el.renderOrder = 10;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._vr_traka_dole_telo.visible
			let parentEl = me._vr_traka_dole_telo.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vr_traka_dole_telo.userData.opacity = v;
			v = v * me._vr_traka_dole_telo.userData.parentOpacity;
			me._vr_traka_dole_telo.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_traka_dole_telo.children.length; i++) {
				let child = me._vr_traka_dole_telo.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vr_traka_dole_telo.userData.parentOpacity = v;
			v = v * me._vr_traka_dole_telo.userData.opacity
			me._vr_traka_dole_telo.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_traka_dole_telo.children.length; i++) {
				let child = me._vr_traka_dole_telo.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vr_traka_dole_telo = el;
		el.userData.ggId="vr_traka_dole_telo";
		me._vr_traka_dole_telo.userData.ggUpdatePosition=function (useTransition) {
		}
		me._vr_naslovi.add(me._vr_traka_dole_telo);
		geometry = new THREE.PlaneGeometry(0.47, 0.57, 5, 5 );
		geometry.name = 'vr_traka_dole_kapa_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAAByCAYAAADavGYjAAABHElEQVR4nO3QQQmAQAAAQbXBgZjRSGaUAyvYwnm4k2DZ9djHteRT93zOTUf8VeORxiONRxqPNB5pPNJ4pPFI45HGI41HGo80Hmk80nik8UjjkcYjjUcajzQeaTzSeKTxSOORxiONRxqPNB5pPNJ4pPFI45HGI41HGo80Hmk80nik8UjjkcYjjUcajzQeaTzSeKTxSOORxiONRxqPNB5pPNJ4pPFI45HGI41HGo80Hmk80nik8UjjkcYjjUcajzQeaTzSeKTxSOORxiONRxqPNB5pPNJ4pPFI45HGI41HGo80Hmk80nik8UjjkcYjjUcajzQeaTzSeKTxSOORxiONRxqPNB5pPNJ4pPFI45HGI41HGo80Hmk80nik8cgLdpwE5MzpXRUAAAAASUVORK'+
	'5CYII=');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'vr_traka_dole_kapa_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(1.15);
		el.translateY(-0.405);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 47;
		el.userData.height = 57;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'vr_traka_dole_kapa';
		el.userData.x = 1.15;
		el.userData.y = -0.405;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.110);
		el.renderOrder = 11;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._vr_traka_dole_kapa.material) me._vr_traka_dole_kapa.material.opacity = v;
			me._vr_traka_dole_kapa.visible = (v>0 && me._vr_traka_dole_kapa.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._vr_traka_dole_kapa.visible
			let parentEl = me._vr_traka_dole_kapa.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vr_traka_dole_kapa.userData.opacity = v;
			v = v * me._vr_traka_dole_kapa.userData.parentOpacity;
			me._vr_traka_dole_kapa.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_traka_dole_kapa.children.length; i++) {
				let child = me._vr_traka_dole_kapa.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vr_traka_dole_kapa.userData.parentOpacity = v;
			v = v * me._vr_traka_dole_kapa.userData.opacity
			me._vr_traka_dole_kapa.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_traka_dole_kapa.children.length; i++) {
				let child = me._vr_traka_dole_kapa.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vr_traka_dole_kapa = el;
		el.userData.ggId="vr_traka_dole_kapa";
		me._vr_traka_dole_kapa.userData.ggUpdatePosition=function (useTransition) {
		}
		me._vr_naslovi.add(me._vr_traka_dole_kapa);
		geometry = new THREE.PlaneGeometry(3.9, 0.57, 5, 5 );
		geometry.name = 'vr_naslov_dole_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'vr_naslov_dole_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._vr_naslov_dole.material.opacity = v;
			if (me._vr_naslov_dole.userData.hasScrollbar) {
				me._vr_naslov_dole.userData.scrollbar.material.opacity = v;
				me._vr_naslov_dole.userData.scrollbarBg.material.opacity = v;
			}
			if (me._vr_naslov_dole.userData.ggSubElement) {
				me._vr_naslov_dole.userData.ggSubElement.material.opacity = v
				me._vr_naslov_dole.userData.ggSubElement.visible = (v>0 && me._vr_naslov_dole.userData.visible);
			}
			me._vr_naslov_dole.visible = (v>0 && me._vr_naslov_dole.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._vr_naslov_dole.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._vr_naslov_dole.userData.backgroundColorAlpha = v;
			me._vr_naslov_dole.userData.setOpacity(me._vr_naslov_dole.userData.opacity);
		}
		el.translateX(-1.095);
		el.translateY(-0.405);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 390;
		el.userData.height = 57;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'vr_naslov_dole';
		el.userData.x = -1.095;
		el.userData.y = -0.405;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.120);
		el.renderOrder = 12;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._vr_naslov_dole.visible
			let parentEl = me._vr_naslov_dole.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vr_naslov_dole.userData.opacity = v;
			v = v * me._vr_naslov_dole.userData.parentOpacity;
			me._vr_naslov_dole.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_naslov_dole.children.length; i++) {
				let child = me._vr_naslov_dole.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vr_naslov_dole.userData.parentOpacity = v;
			v = v * me._vr_naslov_dole.userData.opacity
			me._vr_naslov_dole.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_naslov_dole.children.length; i++) {
				let child = me._vr_naslov_dole.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vr_naslov_dole = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(1, 1, 1).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0.945098, 0.901961, 0.811765).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 780;
		canvas.height = 114;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._vr_naslov_dole.userData.totalHeightCanv = 2 * (3);
			me._vr_naslov_dole.userData.textLines = [];
			var ctx = me._vr_naslov_dole.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._vr_naslov_dole.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._vr_naslov_dole.userData.textLines.push(line);
					line = '';
					me._vr_naslov_dole.userData.totalHeightCanv += me._vr_naslov_dole.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._vr_naslov_dole.userData.width - 0 - (scrollbar ? 25 : 0))) && i > 0) {
					me._vr_naslov_dole.userData.textLines.push(line);
					line = words[i];
					me._vr_naslov_dole.userData.totalHeightCanv += me._vr_naslov_dole.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._vr_naslov_dole.userData.textLines.push(line);
			me._vr_naslov_dole.userData.totalHeightCanv += me._vr_naslov_dole.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._vr_naslov_dole.userData.textCanvas;
			var ctx = me._vr_naslov_dole.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._vr_naslov_dole.userData.textColor.r * 255 + ', ' + me._vr_naslov_dole.userData.textColor.g * 255 + ', ' + me._vr_naslov_dole.userData.textColor.b * 255 + ', ' + me._vr_naslov_dole.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = 2 * 0;
			ctx.textAlign = 'left';
			var y = 2 * 3;
			y += (canv.height - me._vr_naslov_dole.userData.totalHeightCanv - (2 * 0)) / 2;
			for (var i = 0; i < me._vr_naslov_dole.userData.textLines.length; i++) {
				var curTextLine = me._vr_naslov_dole.userData.textLines[i];
				var curTextLineBase = me._vr_naslov_dole.userData.textLines[i];
				if ((ctx.measureText(curTextLine).width + (2 * 0)) > canv.width) {
					var cutChars = 0;
					do {
						cutChars++;
						curTextLine = curTextLineBase.substring(0, curTextLineBase.length - cutChars) + '...';
					} while (cutChars < curTextLineBase.length && (ctx.measureText(curTextLine).width + (2 * 0)) > canv.width);
				}
				ctx.fillText(curTextLine, x, y);
				y += me._vr_naslov_dole.userData.lineHeightCanv;
			}
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'vr_naslov_dole_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._vr_naslov_dole.material.map) {
				me._vr_naslov_dole.material.map.dispose();
			}
			me._vr_naslov_dole.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._vr_naslov_dole.children.length; i++) {
				let child = me._vr_naslov_dole.children[i];
				if (child.name.includes('scrollbar')) me._vr_naslov_dole.remove(child);
			}
			var canv = me._vr_naslov_dole.userData.textCanvas;
			var ctx = me._vr_naslov_dole.userData.textCanvasContext;
			ctx.font = 'normal 52px Verdana';
			me._vr_naslov_dole.userData.lineHeightCanv = 52 * 1.2;
			me._vr_naslov_dole.userData.textLines = [];
			me._vr_naslov_dole.userData.textLines.push(me._vr_naslov_dole.userData.ggText);
			me._vr_naslov_dole.userData.totalHeightCanv = 2 * (3);
			me._vr_naslov_dole.userData.totalHeightCanv += me._vr_naslov_dole.userData.lineHeightCanv;
			me._vr_naslov_dole.userData.boxWidthCanv = 2 * me._vr_naslov_dole.userData.width;
			me._vr_naslov_dole.userData.boxHeightCanv = 2 * me._vr_naslov_dole.userData.height;
			me._vr_naslov_dole.userData.hasScrollbar = false;
			canv.width = me._vr_naslov_dole.userData.boxWidthCanv;
			canv.height = me._vr_naslov_dole.userData.boxHeightCanv;
			ctx.font = 'normal 52px Verdana';
			me._vr_naslov_dole.userData.ggPaintCanvasText();
		}
		me._vr_naslov_dole.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.ggUserdata.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._vr_naslov_dole.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._vr_naslov_dole.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._vr_naslov_dole.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._vr_naslov_dole.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._vr_naslov_dole.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._vr_naslov_dole.userData.textColorAlpha = v;
		}
		el.userData.ggId="vr_naslov_dole";
		me._vr_naslov_dole.userData.ggUpdatePosition=function (useTransition) {
		}
		me._vr_naslovi.add(me._vr_naslov_dole);
		geometry = new THREE.PlaneGeometry(4.67, 0.02, 5, 5 );
		geometry.name = 'vr_traka_dole_linija_gore_geometry';
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.788235, 0.627451, 0.305882).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'vr_traka_dole_linija_gore_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.85098;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._vr_traka_dole_linija_gore.material.opacity = v * me._vr_traka_dole_linija_gore.userData.backgroundColorAlpha;
			if (me._vr_traka_dole_linija_gore.userData.ggSubElement) {
				me._vr_traka_dole_linija_gore.userData.ggSubElement.material.opacity = v
				me._vr_traka_dole_linija_gore.userData.ggSubElement.visible = (v>0 && me._vr_traka_dole_linija_gore.userData.visible);
			}
			me._vr_traka_dole_linija_gore.visible = (v>0 && me._vr_traka_dole_linija_gore.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._vr_traka_dole_linija_gore.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._vr_traka_dole_linija_gore.userData.backgroundColorAlpha = v;
			me._vr_traka_dole_linija_gore.userData.setOpacity(me._vr_traka_dole_linija_gore.userData.opacity);
		}
		el.translateX(-0.95);
		el.translateY(-0.13);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 467;
		el.userData.height = 2;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'vr_traka_dole_linija_gore';
		el.userData.x = -0.95;
		el.userData.y = -0.13;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.130);
		el.renderOrder = 13;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._vr_traka_dole_linija_gore.visible
			let parentEl = me._vr_traka_dole_linija_gore.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vr_traka_dole_linija_gore.userData.opacity = v;
			v = v * me._vr_traka_dole_linija_gore.userData.parentOpacity;
			me._vr_traka_dole_linija_gore.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_traka_dole_linija_gore.children.length; i++) {
				let child = me._vr_traka_dole_linija_gore.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vr_traka_dole_linija_gore.userData.parentOpacity = v;
			v = v * me._vr_traka_dole_linija_gore.userData.opacity
			me._vr_traka_dole_linija_gore.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_traka_dole_linija_gore.children.length; i++) {
				let child = me._vr_traka_dole_linija_gore.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vr_traka_dole_linija_gore = el;
		el.userData.ggId="vr_traka_dole_linija_gore";
		me._vr_traka_dole_linija_gore.userData.ggUpdatePosition=function (useTransition) {
		}
		me._vr_naslovi.add(me._vr_traka_dole_linija_gore);
		geometry = new THREE.PlaneGeometry(4.67, 0.02, 5, 5 );
		geometry.name = 'vr_traka_dole_linija_dole_geometry';
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.788235, 0.627451, 0.305882).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'vr_traka_dole_linija_dole_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.85098;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._vr_traka_dole_linija_dole.material.opacity = v * me._vr_traka_dole_linija_dole.userData.backgroundColorAlpha;
			if (me._vr_traka_dole_linija_dole.userData.ggSubElement) {
				me._vr_traka_dole_linija_dole.userData.ggSubElement.material.opacity = v
				me._vr_traka_dole_linija_dole.userData.ggSubElement.visible = (v>0 && me._vr_traka_dole_linija_dole.userData.visible);
			}
			me._vr_traka_dole_linija_dole.visible = (v>0 && me._vr_traka_dole_linija_dole.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._vr_traka_dole_linija_dole.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._vr_traka_dole_linija_dole.userData.backgroundColorAlpha = v;
			me._vr_traka_dole_linija_dole.userData.setOpacity(me._vr_traka_dole_linija_dole.userData.opacity);
		}
		el.translateX(-0.95);
		el.translateY(-0.68);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 467;
		el.userData.height = 2;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'vr_traka_dole_linija_dole';
		el.userData.x = -0.95;
		el.userData.y = -0.68;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.140);
		el.renderOrder = 14;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._vr_traka_dole_linija_dole.visible
			let parentEl = me._vr_traka_dole_linija_dole.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vr_traka_dole_linija_dole.userData.opacity = v;
			v = v * me._vr_traka_dole_linija_dole.userData.parentOpacity;
			me._vr_traka_dole_linija_dole.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_traka_dole_linija_dole.children.length; i++) {
				let child = me._vr_traka_dole_linija_dole.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vr_traka_dole_linija_dole.userData.parentOpacity = v;
			v = v * me._vr_traka_dole_linija_dole.userData.opacity
			me._vr_traka_dole_linija_dole.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_traka_dole_linija_dole.children.length; i++) {
				let child = me._vr_traka_dole_linija_dole.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vr_traka_dole_linija_dole = el;
		el.userData.ggId="vr_traka_dole_linija_dole";
		me._vr_traka_dole_linija_dole.userData.ggUpdatePosition=function (useTransition) {
		}
		me._vr_naslovi.add(me._vr_traka_dole_linija_dole);
		me.skinGroup.add(me._vr_naslovi);
		me._thumbnails.logicBlock_visible();
		me._thumbnails.userData.setOpacity(1.00);
		me._node_cloner_vr.userData.setOpacity(1.00);
		me._node_cloner_vr.userData.ggUpdate();
		me._page_up.logicBlock_position();
		me._page_up.logicBlock_scaling();
		me._page_up.logicBlock_visible();
		me._page_up.userData.setOpacity(1.00);
		me.elementMouseOver['page_up']=false;
		me._page_down.logicBlock_scaling();
		me._page_down.logicBlock_visible();
		me._page_down.userData.setOpacity(1.00);
		me.elementMouseOver['page_down']=false;
		me._exit_vr_close.logicBlock_scaling();
		me._exit_vr_close.userData.setOpacity(1.00);
		me.elementMouseOver['exit_vr_close']=false;
		me._close_skin.logicBlock_scaling();
		me._close_skin.userData.setOpacity(1.00);
		me.elementMouseOver['close_skin']=false;
		me._exit_vr_open.logicBlock_scaling();
		me._exit_vr_open.userData.setOpacity(1.00);
		me.elementMouseOver['exit_vr_open']=false;
		me._open_skin.logicBlock_scaling();
		me._open_skin.userData.setOpacity(1.00);
		me.elementMouseOver['open_skin']=false;
		me._vr_naslovi.userData.setOpacity(1.00);
		me._vr_traka_gore_telo.userData.setOpacity(1.00);
		me._vr_traka_gore_kapa.userData.setOpacity(1.00);
		me._vr_naslov_gore.userData.setOpacity(1.00);
		me._vr_traka_gore_linija_gore.userData.setOpacity(1.00);
		me._vr_traka_gore_linija_dole.userData.setOpacity(1.00);
		me._vr_traka_dole_telo.userData.setOpacity(1.00);
		me._vr_traka_dole_kapa.userData.setOpacity(1.00);
		me._vr_naslov_dole.userData.setOpacity(1.00);
		me._vr_traka_dole_linija_gore.userData.setOpacity(1.00);
		me._vr_traka_dole_linija_dole.userData.setOpacity(1.00);
		me.eventactivehotspotchangedCallback = function() {
			if (hotspotTemplates.hasOwnProperty('ht_info')) {
				for(var i = 0; i < hotspotTemplates['ht_info'].length; i++) {
					hotspotTemplates['ht_info'][i].ggEvent_activehotspotchanged();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_image')) {
				for(var i = 0; i < hotspotTemplates['ht_image'].length; i++) {
					hotspotTemplates['ht_image'][i].ggEvent_activehotspotchanged();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_node')) {
				for(var i = 0; i < hotspotTemplates['ht_node'].length; i++) {
					hotspotTemplates['ht_node'][i].ggEvent_activehotspotchanged();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_activehotspotchanged();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_url')) {
				for(var i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
					hotspotTemplates['ht_video_url'][i].ggEvent_activehotspotchanged();
				}
			}
		};
		player.addListener('activehotspotchanged', me.eventactivehotspotchangedCallback);
		me.eventchangenodeCallback = function() {
			if (hotspotTemplates.hasOwnProperty('ht_info')) {
				for(var i = 0; i < hotspotTemplates['ht_info'].length; i++) {
					hotspotTemplates['ht_info'][i].ggEvent_changenode();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_image')) {
				for(var i = 0; i < hotspotTemplates['ht_image'].length; i++) {
					hotspotTemplates['ht_image'][i].ggEvent_changenode();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_node')) {
				for(var i = 0; i < hotspotTemplates['ht_node'].length; i++) {
					hotspotTemplates['ht_node'][i].ggEvent_changenode();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_changenode();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_url')) {
				for(var i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
					hotspotTemplates['ht_video_url'][i].ggEvent_changenode();
				}
			}
			me.skin_nodechangeCallback();
			me._page_up.logicBlock_position();
			me._page_up.logicBlock_visible();
			me._page_down.logicBlock_visible();
				me._vr_naslov_gore.userData.ggUpdateText();
				me._vr_naslov_dole.userData.ggUpdateText();
		};
		player.addListener('changenode', me.eventchangenodeCallback);
		me.eventconfigloadedCallback = function() {
			if (hotspotTemplates.hasOwnProperty('ht_info')) {
				for(var i = 0; i < hotspotTemplates['ht_info'].length; i++) {
					hotspotTemplates['ht_info'][i].ggEvent_configloaded();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_image')) {
				for(var i = 0; i < hotspotTemplates['ht_image'].length; i++) {
					hotspotTemplates['ht_image'][i].ggEvent_configloaded();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_node')) {
				for(var i = 0; i < hotspotTemplates['ht_node'].length; i++) {
					hotspotTemplates['ht_node'][i].ggEvent_configloaded();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_configloaded();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_url')) {
				for(var i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
					hotspotTemplates['ht_video_url'][i].ggEvent_configloaded();
				}
			}
			me._thumbnails.logicBlock_visible();
			me._page_up.logicBlock_position();
			me._page_up.logicBlock_visible();
			me._page_down.logicBlock_visible();
		};
		player.addListener('configloaded', me.eventconfigloadedCallback);
		me.eventvarchanged_node_cloner_vr_hasDownCallback = function() {
			me._page_up.logicBlock_position();
			me._page_down.logicBlock_visible();
		};
		player.addListener('varchanged_node_cloner_vr_hasDown', me.eventvarchanged_node_cloner_vr_hasDownCallback);
		me.eventvarchanged_node_cloner_vr_hasUpCallback = function() {
			me._page_up.logicBlock_visible();
		};
		player.addListener('varchanged_node_cloner_vr_hasUp', me.eventvarchanged_node_cloner_vr_hasUpCallback);
		me.eventvarchanged_vis_image_hotspotsCallback = function() {
			if (hotspotTemplates.hasOwnProperty('ht_image')) {
				for(var i = 0; i < hotspotTemplates['ht_image'].length; i++) {
					hotspotTemplates['ht_image'][i].ggEvent_varchanged_vis_image_hotspots();
				}
			}
		};
		player.addListener('varchanged_vis_image_hotspots', me.eventvarchanged_vis_image_hotspotsCallback);
		me.eventvarchanged_vis_info_hotspotsCallback = function() {
			if (hotspotTemplates.hasOwnProperty('ht_info')) {
				for(var i = 0; i < hotspotTemplates['ht_info'].length; i++) {
					hotspotTemplates['ht_info'][i].ggEvent_varchanged_vis_info_hotspots();
				}
			}
		};
		player.addListener('varchanged_vis_info_hotspots', me.eventvarchanged_vis_info_hotspotsCallback);
		me.eventvarchanged_vis_video_file_hotspotsCallback = function() {
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_varchanged_vis_video_file_hotspots();
				}
			}
		};
		player.addListener('varchanged_vis_video_file_hotspots', me.eventvarchanged_vis_video_file_hotspotsCallback);
		me.eventvarchanged_vis_video_url_hotspotsCallback = function() {
			if (hotspotTemplates.hasOwnProperty('ht_video_url')) {
				for(var i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
					hotspotTemplates['ht_video_url'][i].ggEvent_varchanged_vis_video_url_hotspots();
				}
			}
		};
		player.addListener('varchanged_vis_video_url_hotspots', me.eventvarchanged_vis_video_url_hotspotsCallback);
	};
	this.removeSkin=function() {
	};
	function SkinCloner_node_cloner_vr_Class(nodeId, parentScope, ggParent, parameter) {
		var me=this;
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.ggUserdata.nodeId=me.ggNodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
			me.__obj = new THREE.Group;
			me.__obj.name = 'node_cloner_vr_subElement';
			me.__obj.position.x = parameter.left;
			me.__obj.position.y = parameter.top;
			me.__obj.userData.ggIsActive = function() {
				return player.getCurrentNode()==me.userData.ggNodeId;
			}
			me.__obj.userData.ggElementNodeId=function() {
				return me.userData.ggNodeId;
			}
		geometry = new THREE.PlaneGeometry(2.5, 0.32, 5, 5 );
		geometry.name = 'node_title_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'node_title_material';
		el = new THREE.Mesh( geometry, material );
		width = 2.5;
		height = 0.32;
		borderShape = new THREE.Shape();
		borderShape.moveTo((-width / 2.0) - 0 + 0, (height / 2.0) + 0);
		borderShape.lineTo((width / 2.0) + 0 - 0, (height / 2.0) + 0);
		borderShape.lineTo((width / 2.0) + 0, (-height / 2.0) - 0.02 + 0);
		borderShape.lineTo((-width / 2.0) - 0 + 0, (-height / 2.0) - 0.02);
		borderShape.lineTo((-width / 2.0) - 0, (height / 2.0) + 0 - 0);
		innerShape = new THREE.Path();
		innerShape.moveTo((-width / 2.0), (height / 2.0));
		innerShape.lineTo((width / 2.0), (height / 2.0));
		innerShape.lineTo((width / 2.0), (-height / 2.0));
		innerShape.lineTo((-width / 2.0), (-height / 2.0));
		borderShape.holes.push(innerShape);
		borderGeometry = new THREE.ShapeGeometry(borderShape);
		borderGeometry.name = 'node_title_borderGeometry';
		borderMaterial = new THREE.MeshBasicMaterial( {color: new THREE.Color(0.788235, 0.627451, 0.305882).convertSRGBToLinear(), side: THREE.DoubleSide, transparent: true } );
		borderMaterial.name = 'node_title_borderMaterial';
		el.userData.border = new THREE.Mesh( borderGeometry, borderMaterial );
		el.userData.border.name = 'node_title_borderMesh';
		el.add(el.userData.border);
		el.userData.backgroundColorAlpha = 0.6;
		el.userData.borderColorAlpha = 0.54902;
		el.userData.setOpacityInternal = function(v) {
			me._node_title.material.opacity = v;
			if (me._node_title.userData.hasScrollbar) {
				me._node_title.userData.scrollbar.material.opacity = v;
				me._node_title.userData.scrollbarBg.material.opacity = v;
			}
			me._node_title.userData.border.material.opacity = v * me._node_title.userData.borderColorAlpha;
			if (me._node_title.userData.ggSubElement) {
				me._node_title.userData.ggSubElement.material.opacity = v
				me._node_title.userData.ggSubElement.visible = (v>0 && me._node_title.userData.visible);
			}
			me._node_title.visible = (v>0 && me._node_title.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._node_title.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._node_title.userData.backgroundColorAlpha = v;
			me._node_title.userData.setOpacity(me._node_title.userData.opacity);
		}
		el.userData.setBorderColor = function(v) {
			me._node_title.userData.border.material.color = v;
		}
		el.userData.setBorderColorAlpha = function(v) {
			me._node_title.userData.borderColorAlpha = v;
			me._node_title.userData.setOpacity(me._node_title.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0.01);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 250;
		el.userData.height = 32;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'node_title';
		el.userData.x = 0;
		el.userData.y = 0.01;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._node_title.visible
			let parentEl = me._node_title.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._node_title.userData.opacity = v;
			v = v * me._node_title.userData.parentOpacity;
			me._node_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_title.children.length; i++) {
				let child = me._node_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._node_title.userData.parentOpacity = v;
			v = v * me._node_title.userData.opacity
			me._node_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_title.children.length; i++) {
				let child = me._node_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._node_title = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(0.0862745, 0.0784314, 0.0666667).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0.945098, 0.901961, 0.811765).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 500;
		canvas.height = 64;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._node_title.userData.totalHeightCanv = 2 * (3);
			me._node_title.userData.textLines = [];
			var ctx = me._node_title.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._node_title.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._node_title.userData.textLines.push(line);
					line = '';
					me._node_title.userData.totalHeightCanv += me._node_title.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._node_title.userData.width - 20 - (scrollbar ? 25 : 0))) && i > 0) {
					me._node_title.userData.textLines.push(line);
					line = words[i];
					me._node_title.userData.totalHeightCanv += me._node_title.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._node_title.userData.textLines.push(line);
			me._node_title.userData.totalHeightCanv += me._node_title.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._node_title.userData.textCanvas;
			var ctx = me._node_title.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._node_title.userData.backgroundColor.r * 255 + ', ' + me._node_title.userData.backgroundColor.g * 255 + ', ' + me._node_title.userData.backgroundColor.b * 255 + ', ' + me._node_title.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._node_title.userData.textColor.r * 255 + ', ' + me._node_title.userData.textColor.g * 255 + ', ' + me._node_title.userData.textColor.b * 255 + ', ' + me._node_title.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = 2 * 10;
			ctx.textAlign = 'left';
			var y = 2 * 3;
			y += (canv.height - me._node_title.userData.totalHeightCanv - (2 * 0)) / 2;
			for (var i = 0; i < me._node_title.userData.textLines.length; i++) {
				var curTextLine = me._node_title.userData.textLines[i];
				var curTextLineBase = me._node_title.userData.textLines[i];
				if ((ctx.measureText(curTextLine).width + (2 * 10)) > canv.width) {
					var cutChars = 0;
					do {
						cutChars++;
						curTextLine = curTextLineBase.substring(0, curTextLineBase.length - cutChars) + '...';
					} while (cutChars < curTextLineBase.length && (ctx.measureText(curTextLine).width + (2 * 10)) > canv.width);
				}
				ctx.fillText(curTextLine, x, y);
				y += me._node_title.userData.lineHeightCanv;
			}
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'node_title_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._node_title.material.map) {
				me._node_title.material.map.dispose();
			}
			me._node_title.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._node_title.children.length; i++) {
				let child = me._node_title.children[i];
				if (child.name.includes('scrollbar')) me._node_title.remove(child);
			}
			var canv = me._node_title.userData.textCanvas;
			var ctx = me._node_title.userData.textCanvasContext;
			ctx.font = '40px Verdana';
			me._node_title.userData.lineHeightCanv = 40 * 1.2;
			me._node_title.userData.textLines = [];
			me._node_title.userData.textLines.push(me._node_title.userData.ggText);
			me._node_title.userData.totalHeightCanv = 2 * (3);
			me._node_title.userData.totalHeightCanv += me._node_title.userData.lineHeightCanv;
			me._node_title.userData.boxWidthCanv = 2 * me._node_title.userData.width;
			me._node_title.userData.boxHeightCanv = 2 * me._node_title.userData.height;
			me._node_title.userData.hasScrollbar = false;
			canv.width = me._node_title.userData.boxWidthCanv;
			canv.height = me._node_title.userData.boxHeightCanv;
			ctx.font = '40px Verdana';
			me._node_title.userData.ggPaintCanvasText();
		}
		me._node_title.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(me.ggUserdata.title)));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._node_title.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._node_title.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._node_title.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._node_title.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._node_title.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._node_title.userData.textColorAlpha = v;
		}
		el.userData.ggId="node_title";
		me._node_title.logicBlock_backgroundcolor = function() {
			var newLogicStateBackgroundColor;
			if (
				((me.elementMouseOver['node_title'] == true))
			)
			{
				newLogicStateBackgroundColor = 0;
			}
			else {
				newLogicStateBackgroundColor = -1;
			}
			if (me._node_title.ggCurrentLogicStateBackgroundColor != newLogicStateBackgroundColor) {
				me._node_title.ggCurrentLogicStateBackgroundColor = newLogicStateBackgroundColor;
				if (me._node_title.ggCurrentLogicStateBackgroundColor == 0) {
					me._node_title.userData.setBackgroundColor(new THREE.Color('#785c28'));
					me._node_title.userData.setBackgroundColorAlpha(0.921569);
					me._node_title.userData.ggUpdateText(true);
				}
				else {
					me._node_title.userData.setBackgroundColor(new THREE.Color('#161411'));
					me._node_title.userData.setBackgroundColorAlpha(0.6);
					me._node_title.userData.ggUpdateText(true);
				}
			}
		}
		me._node_title.logicBlock_backgroundcolor();
		me._node_title.userData.onclick=function (e) {
			player.openNext("{"+me.ggNodeId+"}","");
		}
		me._node_title.userData.onmouseenter=function (e) {
			me.elementMouseOver['node_title']=true;
			me._node_title.logicBlock_backgroundcolor();
		}
		me._node_title.userData.ontouchend=function (e) {
			me._node_title.logicBlock_backgroundcolor();
		}
		me._node_title.userData.onmouseleave=function (e) {
			me.elementMouseOver['node_title']=false;
			me._node_title.logicBlock_backgroundcolor();
		}
		me._node_title.userData.ggUpdatePosition=function (useTransition) {
		}
		me.__obj.add(me._node_title);
		me._node_title.logicBlock_backgroundcolor();
		me._node_title.userData.setOpacity(1.00);
		me.elementMouseOver['node_title']=false;
	};
	function SkinHotspotClass_ht_video_url(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_video_url';
		el.userData.x = -2;
		el.userData.y = 1;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_url.visible
			let parentEl = me._ht_video_url.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url.userData.opacity = v;
			v = v * me._ht_video_url.userData.parentOpacity;
			me._ht_video_url.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url.children.length; i++) {
				let child = me._ht_video_url.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url.userData.parentOpacity = v;
			v = v * me._ht_video_url.userData.opacity
			me._ht_video_url.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url.children.length; i++) {
				let child = me._ht_video_url.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url = el;
		el.userData.ggId="ht_video_url";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_video_url.userData.onclick=function (e) {
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_url.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_url.userData.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_url']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_url.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_video_url']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
			player.setActiveHotspot(null);
		}
		me._ht_video_url.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'ht_video_url_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_url_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(-0.01);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_icon';
		el.userData.x = 0;
		el.userData.y = -0.01;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_url_icon.material) me._ht_video_url_icon.material.opacity = v;
			me._ht_video_url_icon.visible = (v>0 && me._ht_video_url_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_icon.visible
			let parentEl = me._ht_video_url_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_icon.userData.opacity = v;
			v = v * me._ht_video_url_icon.userData.parentOpacity;
			me._ht_video_url_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_icon.children.length; i++) {
				let child = me._ht_video_url_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_icon.userData.parentOpacity = v;
			v = v * me._ht_video_url_icon.userData.opacity
			me._ht_video_url_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_icon.children.length; i++) {
				let child = me._ht_video_url_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_icon = el;
		el.userData.ggId="ht_video_url_icon";
		me._ht_video_url_icon.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_video_url_icon'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_url_icon.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_url_icon.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_url_icon.ggCurrentLogicStateScaling == 0) {
					me._ht_video_url_icon.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._ht_video_url_icon.userData.transitions.length; i++) {
						if (me._ht_video_url_icon.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_icon.userData.transitions[i].interval);
							me._ht_video_url_icon.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_url_icon.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_icon.scale.set(transition_scale.startScale.x + (me._ht_video_url_icon.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_icon.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_icon.position.x = (me._ht_video_url_icon.position.x - me._ht_video_url_icon.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_icon.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_icon.position.y = (me._ht_video_url_icon.position.y - me._ht_video_url_icon.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_icon.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_icon.userData.transitions.splice(me._ht_video_url_icon.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_icon.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_url_icon.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_url_icon.userData.transitions.length; i++) {
						if (me._ht_video_url_icon.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_icon.userData.transitions[i].interval);
							me._ht_video_url_icon.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_url_icon.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_icon.scale.set(transition_scale.startScale.x + (me._ht_video_url_icon.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_icon.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_icon.position.x = (me._ht_video_url_icon.position.x - me._ht_video_url_icon.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_icon.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_icon.position.y = (me._ht_video_url_icon.position.y - me._ht_video_url_icon.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_icon.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_icon.userData.transitions.splice(me._ht_video_url_icon.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_icon.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_url_icon.logicBlock_scaling();
		me._ht_video_url_icon.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(((player.getVariableValue('vis_video_url_hotspots') !== null) && (player.getVariableValue('vis_video_url_hotspots')).indexOf("<"+me.hotspot.id+">") != -1)) || 
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_url_icon.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_url_icon.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_url_icon.ggCurrentLogicStateVisible == 0) {
			me._ht_video_url_icon.visible=false;
			me._ht_video_url_icon.userData.visible=false;
				}
				else {
			me._ht_video_url_icon.visible=((!me._ht_video_url_icon.material && Number(me._ht_video_url_icon.userData.opacity>0)) || Number(me._ht_video_url_icon.material.opacity)>0)?true:false;
			me._ht_video_url_icon.userData.visible=true;
				}
			}
		}
		me._ht_video_url_icon.logicBlock_visible();
		me._ht_video_url_icon.userData.onclick=function (e) {
			player.setVariableValue('vis_video_url_hotspots', player.getVariableValue('vis_video_url_hotspots') + "<"+me.hotspot.id+">");
			me._ht_video_url_video.userData.ggInitMedia(player._(me.hotspot.url));
		}
		me._ht_video_url_icon.userData.onmouseenter=function (e) {
			me.elementMouseOver['ht_video_url_icon']=true;
			me._ht_video_url_tooltip.logicBlock_visible();
			me._ht_video_url_icon.logicBlock_scaling();
		}
		me._ht_video_url_icon.userData.ontouchend=function (e) {
			me._ht_video_url_icon.logicBlock_scaling();
		}
		me._ht_video_url_icon.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_video_url_icon']=false;
			me._ht_video_url_tooltip.logicBlock_visible();
			me._ht_video_url_icon.logicBlock_scaling();
		}
		me._ht_video_url_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(1, 0.22, 5, 5 );
		geometry.name = 'ht_video_url_tooltip_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_url_tooltip_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.85098;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_url_tooltip.material.opacity = v;
			if (me._ht_video_url_tooltip.userData.hasScrollbar) {
				me._ht_video_url_tooltip.userData.scrollbar.material.opacity = v;
				me._ht_video_url_tooltip.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_video_url_tooltip.userData.ggSubElement) {
				me._ht_video_url_tooltip.userData.ggSubElement.material.opacity = v
				me._ht_video_url_tooltip.userData.ggSubElement.visible = (v>0 && me._ht_video_url_tooltip.userData.visible);
			}
			me._ht_video_url_tooltip.visible = (v>0 && me._ht_video_url_tooltip.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_url_tooltip.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_url_tooltip.userData.backgroundColorAlpha = v;
			me._ht_video_url_tooltip.userData.setOpacity(me._ht_video_url_tooltip.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.365);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 100;
		el.userData.height = 22;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_tooltip';
		el.userData.x = 0;
		el.userData.y = -0.365;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_tooltip.visible
			let parentEl = me._ht_video_url_tooltip.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_tooltip.userData.opacity = v;
			v = v * me._ht_video_url_tooltip.userData.parentOpacity;
			me._ht_video_url_tooltip.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_tooltip.children.length; i++) {
				let child = me._ht_video_url_tooltip.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_tooltip.userData.parentOpacity = v;
			v = v * me._ht_video_url_tooltip.userData.opacity
			me._ht_video_url_tooltip.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_tooltip.children.length; i++) {
				let child = me._ht_video_url_tooltip.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_tooltip = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(0.0862745, 0.0784314, 0.0666667).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0.945098, 0.901961, 0.811765).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 200;
		canvas.height = 44;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_video_url_tooltip.userData.totalHeightCanv = 2 * (13);
			me._ht_video_url_tooltip.userData.textLines = [];
			var ctx = me._ht_video_url_tooltip.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_video_url_tooltip.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_video_url_tooltip.userData.textLines.push(line);
					line = '';
					me._ht_video_url_tooltip.userData.totalHeightCanv += me._ht_video_url_tooltip.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._ht_video_url_tooltip.userData.width - 10 - (scrollbar ? 25 : 0))) && i > 0) {
					me._ht_video_url_tooltip.userData.textLines.push(line);
					line = words[i];
					me._ht_video_url_tooltip.userData.totalHeightCanv += me._ht_video_url_tooltip.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._ht_video_url_tooltip.userData.textLines.push(line);
			me._ht_video_url_tooltip.userData.totalHeightCanv += me._ht_video_url_tooltip.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_video_url_tooltip.userData.textCanvas;
			var ctx = me._ht_video_url_tooltip.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_video_url_tooltip.userData.backgroundColor.r * 255 + ', ' + me._ht_video_url_tooltip.userData.backgroundColor.g * 255 + ', ' + me._ht_video_url_tooltip.userData.backgroundColor.b * 255 + ', ' + me._ht_video_url_tooltip.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_video_url_tooltip.userData.textColor.r * 255 + ', ' + me._ht_video_url_tooltip.userData.textColor.g * 255 + ', ' + me._ht_video_url_tooltip.userData.textColor.b * 255 + ', ' + me._ht_video_url_tooltip.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_video_url_tooltip.userData.boxWidthCanv - (me._ht_video_url_tooltip.userData.hasScrollbar ? 50 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 2 * 8;
			for (var i = 0; i < me._ht_video_url_tooltip.userData.textLines.length; i++) {
				ctx.fillText(me._ht_video_url_tooltip.userData.textLines[i], x, y);
				y += me._ht_video_url_tooltip.userData.lineHeightCanv;
			}
			geometry = new THREE.PlaneGeometry(me._ht_video_url_tooltip.userData.boxWidthCanv / 200.0, me._ht_video_url_tooltip.userData.boxHeightCanv / 200.0, 5, 5 );
			geometry.name = 'ht_video_url_tooltip_geometry';
			me._ht_video_url_tooltip.geometry.dispose();
			me._ht_video_url_tooltip.geometry = geometry;
			var diffY = (me._ht_video_url_tooltip.userData.boxHeightCanv / 2) - me._ht_video_url_tooltip.userData.height;
			me._ht_video_url_tooltip.position.y = me._ht_video_url_tooltip.userData.y - ((diffY / 2.0) / 100.0);
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_video_url_tooltip_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_video_url_tooltip.material.map) {
				me._ht_video_url_tooltip.material.map.dispose();
			}
			me._ht_video_url_tooltip.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._ht_video_url_tooltip.children.length; i++) {
				let child = me._ht_video_url_tooltip.children[i];
				if (child.name.includes('scrollbar')) me._ht_video_url_tooltip.remove(child);
			}
			var canv = me._ht_video_url_tooltip.userData.textCanvas;
			var ctx = me._ht_video_url_tooltip.userData.textCanvasContext;
			ctx.font = '36px Verdana';
			me._ht_video_url_tooltip.userData.lineHeightCanv = 36 * 1.2;
			me._ht_video_url_tooltip.userData.textLines = [];
			me._ht_video_url_tooltip.userData.textLines.push(me._ht_video_url_tooltip.userData.ggText);
			me._ht_video_url_tooltip.userData.totalHeightCanv = 2 * (13);
			me._ht_video_url_tooltip.userData.totalHeightCanv += me._ht_video_url_tooltip.userData.lineHeightCanv;
			me._ht_video_url_tooltip.userData.boxWidthCanv = ctx.measureText(me._ht_video_url_tooltip.userData.ggText).width + (2 * 10);
			me._ht_video_url_tooltip.userData.boxHeightCanv = me._ht_video_url_tooltip.userData.totalHeightCanv;
			canv.width = me._ht_video_url_tooltip.userData.boxWidthCanv;
			canv.height = me._ht_video_url_tooltip.userData.boxHeightCanv;
			ctx.font = '36px Verdana';
			me._ht_video_url_tooltip.userData.ggPaintCanvasText();
		}
		me._ht_video_url_tooltip.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_video_url_tooltip.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_video_url_tooltip.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_url_tooltip.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_url_tooltip.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_video_url_tooltip.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_video_url_tooltip.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_video_url_tooltip";
		me._ht_video_url_tooltip.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_video_url_icon'] == true)) && 
				((player._(me.hotspot.title) != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_url_tooltip.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_url_tooltip.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_url_tooltip.ggCurrentLogicStateVisible == 0) {
			me._ht_video_url_tooltip.visible=((!me._ht_video_url_tooltip.material && Number(me._ht_video_url_tooltip.userData.opacity>0)) || Number(me._ht_video_url_tooltip.material.opacity)>0)?true:false;
			me._ht_video_url_tooltip.userData.visible=true;
				}
				else {
			me._ht_video_url_tooltip.visible=false;
			me._ht_video_url_tooltip.userData.visible=false;
				}
			}
		}
		me._ht_video_url_tooltip.logicBlock_visible();
		me._ht_video_url_tooltip.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_url_icon.add(me._ht_video_url_tooltip);
		me._ht_video_url.add(me._ht_video_url_icon);
		geometry = new THREE.PlaneGeometry(3.6, 2.4, 5, 5 );
		geometry.name = 'ht_video_url_bg_geometry';
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.0862745, 0.0784314, 0.0666667).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_url_bg_material';
		el = new THREE.Mesh( geometry, material );
		width = 3.6;
		height = 2.4;
		borderShape = new THREE.Shape();
		borderShape.moveTo((-width / 2.0) - 0.02 + 0, (height / 2.0) + 0.02);
		borderShape.lineTo((width / 2.0) + 0.02 - 0, (height / 2.0) + 0.02);
		borderShape.lineTo((width / 2.0) + 0.02, (-height / 2.0) - 0.02 + 0);
		borderShape.lineTo((-width / 2.0) - 0.02 + 0, (-height / 2.0) - 0.02);
		borderShape.lineTo((-width / 2.0) - 0.02, (height / 2.0) + 0.02 - 0);
		innerShape = new THREE.Path();
		innerShape.moveTo((-width / 2.0), (height / 2.0));
		innerShape.lineTo((width / 2.0), (height / 2.0));
		innerShape.lineTo((width / 2.0), (-height / 2.0));
		innerShape.lineTo((-width / 2.0), (-height / 2.0));
		borderShape.holes.push(innerShape);
		borderGeometry = new THREE.ShapeGeometry(borderShape);
		borderGeometry.name = 'ht_video_url_bg_borderGeometry';
		borderMaterial = new THREE.MeshBasicMaterial( {color: new THREE.Color(0.788235, 0.627451, 0.305882).convertSRGBToLinear(), side: THREE.DoubleSide, transparent: true } );
		borderMaterial.name = 'ht_video_url_bg_borderMaterial';
		el.userData.border = new THREE.Mesh( borderGeometry, borderMaterial );
		el.userData.border.name = 'ht_video_url_bg_borderMesh';
		el.add(el.userData.border);
		el.userData.backgroundColorAlpha = 0.85098;
		el.userData.borderColorAlpha = 0.85098;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_url_bg.material.opacity = v * me._ht_video_url_bg.userData.backgroundColorAlpha;
			me._ht_video_url_bg.userData.border.material.opacity = v * me._ht_video_url_bg.userData.borderColorAlpha;
			if (me._ht_video_url_bg.userData.ggSubElement) {
				me._ht_video_url_bg.userData.ggSubElement.material.opacity = v
				me._ht_video_url_bg.userData.ggSubElement.visible = (v>0 && me._ht_video_url_bg.userData.visible);
			}
			me._ht_video_url_bg.visible = (v>0 && me._ht_video_url_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_url_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_url_bg.userData.backgroundColorAlpha = v;
			me._ht_video_url_bg.userData.setOpacity(me._ht_video_url_bg.userData.opacity);
		}
		el.userData.setBorderColor = function(v) {
			me._ht_video_url_bg.userData.border.material.color = v;
		}
		el.userData.setBorderColorAlpha = function(v) {
			me._ht_video_url_bg.userData.borderColorAlpha = v;
			me._ht_video_url_bg.userData.setOpacity(me._ht_video_url_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(1.188);
		el.scale.set(1.00, 0.01, 1.0);
		el.userData.width = 360;
		el.userData.height = 240;
		el.userData.scale = {x: 1.00, y: 0.01, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 1.188;
		el.name = 'ht_video_url_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_bg.visible
			let parentEl = me._ht_video_url_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_bg.userData.opacity = v;
			v = v * me._ht_video_url_bg.userData.parentOpacity;
			me._ht_video_url_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_bg.children.length; i++) {
				let child = me._ht_video_url_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_bg.userData.parentOpacity = v;
			v = v * me._ht_video_url_bg.userData.opacity
			me._ht_video_url_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_bg.children.length; i++) {
				let child = me._ht_video_url_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_bg = el;
		el.userData.ggId="ht_video_url_bg";
		me._ht_video_url_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				(((player.getVariableValue('vis_video_url_hotspots') !== null) && (player.getVariableValue('vis_video_url_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_url_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_url_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_url_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_video_url_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_url_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_bg.userData.transitions[i].interval);
							me._ht_video_url_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_url_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_bg.scale.set(transition_scale.startScale.x + (me._ht_video_url_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_bg.position.x = (me._ht_video_url_bg.position.x - me._ht_video_url_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_bg.position.y = (me._ht_video_url_bg.position.y - me._ht_video_url_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_bg.userData.transitions.splice(me._ht_video_url_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_url_bg.userData.transitionValue_scale = {x: 1, y: 0.01, z: 1.0};
					for (var i = 0; i < me._ht_video_url_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_bg.userData.transitions[i].interval);
							me._ht_video_url_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_url_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_bg.scale.set(transition_scale.startScale.x + (me._ht_video_url_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_bg.position.x = (me._ht_video_url_bg.position.x - me._ht_video_url_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_bg.position.y = (me._ht_video_url_bg.position.y - me._ht_video_url_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_bg.userData.transitions.splice(me._ht_video_url_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_url_bg.logicBlock_scaling();
		me._ht_video_url_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('vis_video_url_hotspots') !== null) && (player.getVariableValue('vis_video_url_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_url_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_url_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_url_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_url_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_url_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_bg.userData.transitions[i].interval);
							me._ht_video_url_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_bg.material ? me._ht_video_url_bg.material.opacity : me._ht_video_url_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_bg.userData.transitions.splice(me._ht_video_url_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_url_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_url_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_bg.userData.transitions[i].interval);
							me._ht_video_url_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_bg.material ? me._ht_video_url_bg.material.opacity : me._ht_video_url_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_bg.userData.transitions.splice(me._ht_video_url_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_url_bg.logicBlock_alpha();
		me._ht_video_url_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(3.4, 2.2, 5, 5 );
		geometry.name = 'ht_video_url_video_geometry';
		material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_url_video_material';
		el = new THREE.Mesh( geometry, material );
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 340;
		el.userData.height = 220;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_video';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_url_video.material) me._ht_video_url_video.material.opacity = v;
			me._ht_video_url_video.visible = (v>0 && me._ht_video_url_video.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_video.visible
			let parentEl = me._ht_video_url_video.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_video.userData.opacity = v;
			v = v * me._ht_video_url_video.userData.parentOpacity;
			me._ht_video_url_video.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_video.children.length; i++) {
				let child = me._ht_video_url_video.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_video.userData.parentOpacity = v;
			v = v * me._ht_video_url_video.userData.opacity
			me._ht_video_url_video.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_video.children.length; i++) {
				let child = me._ht_video_url_video.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_video = el;
		me._ht_video_url_video.userData.seekbars = [];
		me._ht_video_url_video.userData.ggInitMedia = function(media) {
			if (me._ht_video_url_video__vid) me._ht_video_url_video__vid.pause();
			me._ht_video_url_video__vid = document.createElement('video');
			player.registerVideoElement('ht_video_url_video', me._ht_video_url_video__vid);
			me._ht_video_url_video__vid.setAttribute('autoplay', '');
			me._ht_video_url_video__vid.setAttribute('crossOrigin', 'anonymous');
			me._ht_video_url_video__source = document.createElement('source');
			me._ht_video_url_video__source.setAttribute('src', media);
			me._ht_video_url_video__vid.addEventListener('loadedmetadata', function() {
				let videoAR = me._ht_video_url_video__vid.videoWidth / me._ht_video_url_video__vid.videoHeight;
				let elAR = me._ht_video_url_video.userData.width / me._ht_video_url_video.userData.height;
				if (videoAR > elAR) {
					me._ht_video_url_video.scale.set(1, (me._ht_video_url_video.userData.width / videoAR) / me._ht_video_url_video.userData.height, 1);
				} else {
					me._ht_video_url_video.scale.set((me._ht_video_url_video.userData.height * videoAR) / me._ht_video_url_video.userData.width, 1, 1);
				}
			}, false);
			me._ht_video_url_video__vid.appendChild(me._ht_video_url_video__source);
			videoTexture = new THREE.VideoTexture( me._ht_video_url_video__vid );
			videoTexture.name = 'ht_video_url_video_videoTexture';
			videoTexture.minFilter = THREE.LinearFilter;
			videoTexture.magFilter = THREE.LinearFilter;
			videoTexture.format = THREE.RGBAFormat;
			videoMaterial = new THREE.MeshBasicMaterial( {map: videoTexture, side: THREE.DoubleSide, transparent: true} );
			videoMaterial.name = 'ht_video_url_video_videoMaterial';
			videoMaterial.alphaTest = 0.5;
			me._ht_video_url_video.material = videoMaterial;
		}
		el.userData.ggId="ht_video_url_video";
		me._ht_video_url_video.userData.ggIsActive=function() {
			if (me._ht_video_url_video__vid != null) {
				return (me._ht_video_url_video__vid.paused == false && me._ht_video_url_video__vid.ended == false);
			} else {
				return false;
			}
		}
		me._ht_video_url_video.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(((player.getVariableValue('vis_video_url_hotspots') !== null) && (player.getVariableValue('vis_video_url_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_url_video.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_url_video.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_url_video.ggCurrentLogicStateVisible == 0) {
			me._ht_video_url_video.visible=((!me._ht_video_url_video.material && Number(me._ht_video_url_video.userData.opacity>0)) || Number(me._ht_video_url_video.material.opacity)>0)?true:false;
			me._ht_video_url_video.userData.visible=true;
					if (me._ht_video_url_video.userData.ggVideoNotLoaded) {
						me._ht_video_url_video.userData.ggInitMedia(me._ht_video_url_video.ggVideoSource);
					}
				}
				else {
			me._ht_video_url_video.visible=false;
			me._ht_video_url_video.userData.visible=false;
					me._ht_video_url_video.userData.ggInitMedia('');
				}
			}
		}
		me._ht_video_url_video.logicBlock_visible();
		me._ht_video_url_video.userData.onclick=function (e) {
			player.playPauseSound("ht_video_url_video","1");
		}
		me._ht_video_url_video.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_url_bg.add(me._ht_video_url_video);
		me._ht_video_url.add(me._ht_video_url_bg);
		geometry = new THREE.PlaneGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'ht_video_url_close_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_url_close_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(2.1);
		el.translateY(0.975);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_close';
		el.userData.x = 2.1;
		el.userData.y = 0.975;
		el.userData.hanchor = 1;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_url_close.material) me._ht_video_url_close.material.opacity = v;
			me._ht_video_url_close.visible = (v>0 && me._ht_video_url_close.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_close.visible
			let parentEl = me._ht_video_url_close.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_close.userData.opacity = v;
			v = v * me._ht_video_url_close.userData.parentOpacity;
			me._ht_video_url_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_close.children.length; i++) {
				let child = me._ht_video_url_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_close.userData.parentOpacity = v;
			v = v * me._ht_video_url_close.userData.opacity
			me._ht_video_url_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_close.children.length; i++) {
				let child = me._ht_video_url_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_close = el;
		el.userData.ggId="ht_video_url_close";
		me._ht_video_url_close.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_video_url_close'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_url_close.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_url_close.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_url_close.ggCurrentLogicStateScaling == 0) {
					me._ht_video_url_close.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._ht_video_url_close.userData.transitions.length; i++) {
						if (me._ht_video_url_close.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_close.userData.transitions[i].interval);
							me._ht_video_url_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_url_close.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_close.scale.set(transition_scale.startScale.x + (me._ht_video_url_close.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_close.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_close.position.x = (me._ht_video_url_close.position.x - me._ht_video_url_close.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_close.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_close.position.y = (me._ht_video_url_close.position.y - me._ht_video_url_close.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_close.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_close.userData.transitions.splice(me._ht_video_url_close.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_close.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_url_close.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_url_close.userData.transitions.length; i++) {
						if (me._ht_video_url_close.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_close.userData.transitions[i].interval);
							me._ht_video_url_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_url_close.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_close.scale.set(transition_scale.startScale.x + (me._ht_video_url_close.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_close.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_close.position.x = (me._ht_video_url_close.position.x - me._ht_video_url_close.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_close.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_close.position.y = (me._ht_video_url_close.position.y - me._ht_video_url_close.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_close.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_close.userData.transitions.splice(me._ht_video_url_close.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_close.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_url_close.logicBlock_scaling();
		me._ht_video_url_close.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('vis_video_url_hotspots') !== null) && (player.getVariableValue('vis_video_url_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_url_close.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_url_close.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_url_close.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_url_close.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_url_close.userData.transitions.length; i++) {
						if (me._ht_video_url_close.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_close.userData.transitions[i].interval);
							me._ht_video_url_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_close.material ? me._ht_video_url_close.material.opacity : me._ht_video_url_close.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_close.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_close.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_close.userData.transitions.splice(me._ht_video_url_close.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_close.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_url_close.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_url_close.userData.transitions.length; i++) {
						if (me._ht_video_url_close.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_close.userData.transitions[i].interval);
							me._ht_video_url_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_close.material ? me._ht_video_url_close.material.opacity : me._ht_video_url_close.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_close.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_close.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_close.userData.transitions.splice(me._ht_video_url_close.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_close.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_url_close.logicBlock_alpha();
		me._ht_video_url_close.userData.onclick=function (e) {
			player.setVariableValue('vis_video_url_hotspots', player.getVariableValue('vis_video_url_hotspots').replace("<"+me.hotspot.id+">", ''));
		}
		me._ht_video_url_close.userData.onmouseenter=function (e) {
			me.elementMouseOver['ht_video_url_close']=true;
			me._ht_video_url_close.logicBlock_scaling();
		}
		me._ht_video_url_close.userData.ontouchend=function (e) {
			me._ht_video_url_close.logicBlock_scaling();
		}
		me._ht_video_url_close.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_video_url_close']=false;
			me._ht_video_url_close.logicBlock_scaling();
		}
		me._ht_video_url_close.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_url.add(me._ht_video_url_close);
		el = new THREE.Group();
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_url_customimage.userData.ggSubElement) {
				me._ht_video_url_customimage.userData.ggSubElement.material.opacity = v
				me._ht_video_url_customimage.userData.ggSubElement.visible = (v>0 && me._ht_video_url_customimage.userData.visible);
			}
			me._ht_video_url_customimage.visible = (v>0 && me._ht_video_url_customimage.userData.visible);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 50;
		el.userData.height = 50;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_CustomImage';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_customimage.visible
			let parentEl = me._ht_video_url_customimage.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_customimage.userData.opacity = v;
			v = v * me._ht_video_url_customimage.userData.parentOpacity;
			me._ht_video_url_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_customimage.children.length; i++) {
				let child = me._ht_video_url_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_customimage.userData.parentOpacity = v;
			v = v * me._ht_video_url_customimage.userData.opacity
			me._ht_video_url_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_customimage.children.length; i++) {
				let child = me._ht_video_url_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_customimage = el;
		currentWidth = 50;
		currentHeight = 50;
		var img = {};
		img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
		img.geometry.name = 'ht_video_url_CustomImage_imgGeometry';
		loader = new THREE.TextureLoader();
		el.userData.ggSetUrl = function(extUrl) {
			loader.load(extUrl,
				function (texture) {
				texture.colorSpace = player.getVRTextureColorSpace();
				var loadedMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
				loadedMaterial.name = 'ht_video_url_CustomImage_subElementMaterial';
				me._ht_video_url_customimage.userData.ggSubElement.material = loadedMaterial;
				me._ht_video_url_customimage.userData.ggUpdatePosition();
				me._ht_video_url_customimage.userData.ggText = extUrl;
				me._ht_video_url_customimage.userData.setOpacity(me._ht_video_url_customimage.userData.opacity);
			});
		};
		if ((hotspot) && (hotspot.customimage)) {
			var extUrl=hotspot.customimage;
		}
		el.userData.ggSetUrl(extUrl);
		material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true } );
		material.name = 'ht_video_url_CustomImage_subElementMaterial';
		el.userData.ggSubElement = new THREE.Mesh( img.geometry, material );
		el.userData.ggSubElement.name = 'ht_video_url_CustomImage_subElement';
		el.userData.ggSubElement.position.z = el.position.z + 0.005;
		el.add(el.userData.ggSubElement);
		el.userData.clientWidth = 50;
		el.userData.clientHeight = 50;
		el.userData.ggId="ht_video_url_CustomImage";
		me._ht_video_url_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(((player.getVariableValue('vis_video_url_hotspots') !== null) && (player.getVariableValue('vis_video_url_hotspots')).indexOf("<"+me.hotspot.id+">") == -1)) && 
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_url_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_url_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_url_customimage.ggCurrentLogicStateVisible == 0) {
			me._ht_video_url_customimage.visible=((!me._ht_video_url_customimage.material && Number(me._ht_video_url_customimage.userData.opacity>0)) || Number(me._ht_video_url_customimage.material.opacity)>0)?true:false;
			me._ht_video_url_customimage.userData.visible=true;
				}
				else {
			me._ht_video_url_customimage.visible=false;
			me._ht_video_url_customimage.userData.visible=false;
				}
			}
		}
		me._ht_video_url_customimage.logicBlock_visible();
		me._ht_video_url_customimage.userData.onclick=function (e) {
			player.setVariableValue('vis_video_url_hotspots', player.getVariableValue('vis_video_url_hotspots') + "<"+me.hotspot.id+">");
			me._ht_video_url_video.userData.ggInitMedia(player._(me.hotspot.url));
		}
		me._ht_video_url_customimage.userData.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_video_url_customimage.userData.clientWidth;
			var parentHeight = me._ht_video_url_customimage.userData.clientHeight;
			var img = me._ht_video_url_customimage.userData.ggSubElement;
			var imgWidth = img.material.map.image.naturalWidth;
			var imgHeight = img.material.map.image.naturalHeight;
			var aspectRatioDiv = parentWidth / parentHeight;
			var aspectRatioImg = imgWidth / imgHeight;
			if (imgWidth < parentWidth) parentWidth = imgWidth;
			if (imgHeight < parentHeight) parentHeight = imgHeight;
			var currentWidth, currentHeight;
			img.geometry.dispose();
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
			img.geometry.name = 'ht_video_url_CustomImage_imgGeometry';
			}
		}
		me._ht_video_url.add(me._ht_video_url_customimage);
		me._ht_video_url.userData.setOpacity(1.00);
		me.elementMouseOver['ht_video_url']=false;
		me._ht_video_url_icon.logicBlock_scaling();
		me._ht_video_url_icon.logicBlock_visible();
		me._ht_video_url_icon.userData.setOpacity(1.00);
		me.elementMouseOver['ht_video_url_icon']=false;
		me._ht_video_url_tooltip.logicBlock_visible();
		me._ht_video_url_tooltip.userData.setOpacity(1.00);
		me._ht_video_url_bg.logicBlock_scaling();
		me._ht_video_url_bg.logicBlock_alpha();
		me._ht_video_url_bg.userData.setOpacity(0.00);
		me._ht_video_url_video.logicBlock_visible();
		me._ht_video_url_video.userData.setOpacity(1.00);
		me._ht_video_url_video.userData.ggVideoSource = '';
		me._ht_video_url_video.userData.ggVideoNotLoaded = true;
		me._ht_video_url_close.logicBlock_scaling();
		me._ht_video_url_close.logicBlock_alpha();
		me._ht_video_url_close.userData.setOpacity(0.00);
		me.elementMouseOver['ht_video_url_close']=false;
		me._ht_video_url_customimage.logicBlock_visible();
		me._ht_video_url_customimage.userData.setOpacity(1.00);
			me.ggEvent_activehotspotchanged=function() {
				me._ht_video_url_icon.logicBlock_visible();
				me._ht_video_url_tooltip.logicBlock_visible();
				me._ht_video_url_customimage.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._ht_video_url_icon.logicBlock_visible();
					me._ht_video_url_tooltip.userData.ggUpdateText();
				me._ht_video_url_tooltip.logicBlock_visible();
				me._ht_video_url_bg.logicBlock_scaling();
				me._ht_video_url_bg.logicBlock_alpha();
				me._ht_video_url_video.logicBlock_visible();
				me._ht_video_url_close.logicBlock_alpha();
				me._ht_video_url_customimage.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._ht_video_url_icon.logicBlock_visible();
				me._ht_video_url_tooltip.logicBlock_visible();
				me._ht_video_url_bg.logicBlock_scaling();
				me._ht_video_url_bg.logicBlock_alpha();
				me._ht_video_url_video.logicBlock_visible();
				me._ht_video_url_close.logicBlock_alpha();
				me._ht_video_url_customimage.logicBlock_visible();
			};
			me.ggEvent_varchanged_vis_video_url_hotspots=function() {
				me._ht_video_url_icon.logicBlock_visible();
				me._ht_video_url_bg.logicBlock_scaling();
				me._ht_video_url_bg.logicBlock_alpha();
				me._ht_video_url_video.logicBlock_visible();
				me._ht_video_url_close.logicBlock_alpha();
				me._ht_video_url_customimage.logicBlock_visible();
			};
			me.__obj = me._ht_video_url;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	function SkinHotspotClass_ht_video_file(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_video_file';
		el.userData.x = -2;
		el.userData.y = 1;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_file.visible
			let parentEl = me._ht_video_file.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file.userData.opacity = v;
			v = v * me._ht_video_file.userData.parentOpacity;
			me._ht_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file.children.length; i++) {
				let child = me._ht_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file.userData.parentOpacity = v;
			v = v * me._ht_video_file.userData.opacity
			me._ht_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file.children.length; i++) {
				let child = me._ht_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file = el;
		el.userData.ggId="ht_video_file";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_video_file.userData.onclick=function (e) {
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_file.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_file.userData.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_file']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_file.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_video_file']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
			player.setActiveHotspot(null);
		}
		me._ht_video_file.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'ht_video_file_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_file_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(-0.01);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_icon';
		el.userData.x = 0;
		el.userData.y = -0.01;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_file_icon.material) me._ht_video_file_icon.material.opacity = v;
			me._ht_video_file_icon.visible = (v>0 && me._ht_video_file_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_icon.visible
			let parentEl = me._ht_video_file_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_icon.userData.opacity = v;
			v = v * me._ht_video_file_icon.userData.parentOpacity;
			me._ht_video_file_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_icon.children.length; i++) {
				let child = me._ht_video_file_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_icon.userData.parentOpacity = v;
			v = v * me._ht_video_file_icon.userData.opacity
			me._ht_video_file_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_icon.children.length; i++) {
				let child = me._ht_video_file_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_icon = el;
		el.userData.ggId="ht_video_file_icon";
		me._ht_video_file_icon.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_video_file_icon'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_file_icon.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_file_icon.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_file_icon.ggCurrentLogicStateScaling == 0) {
					me._ht_video_file_icon.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._ht_video_file_icon.userData.transitions.length; i++) {
						if (me._ht_video_file_icon.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_icon.userData.transitions[i].interval);
							me._ht_video_file_icon.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_file_icon.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_icon.scale.set(transition_scale.startScale.x + (me._ht_video_file_icon.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_icon.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_icon.position.x = (me._ht_video_file_icon.position.x - me._ht_video_file_icon.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_icon.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_icon.position.y = (me._ht_video_file_icon.position.y - me._ht_video_file_icon.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_icon.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_icon.userData.transitions.splice(me._ht_video_file_icon.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_icon.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_file_icon.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_file_icon.userData.transitions.length; i++) {
						if (me._ht_video_file_icon.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_icon.userData.transitions[i].interval);
							me._ht_video_file_icon.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_file_icon.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_icon.scale.set(transition_scale.startScale.x + (me._ht_video_file_icon.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_icon.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_icon.position.x = (me._ht_video_file_icon.position.x - me._ht_video_file_icon.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_icon.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_icon.position.y = (me._ht_video_file_icon.position.y - me._ht_video_file_icon.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_icon.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_icon.userData.transitions.splice(me._ht_video_file_icon.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_icon.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_file_icon.logicBlock_scaling();
		me._ht_video_file_icon.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(((player.getVariableValue('vis_video_file_hotspots') !== null) && (player.getVariableValue('vis_video_file_hotspots')).indexOf("<"+me.hotspot.id+">") != -1)) || 
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_file_icon.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_file_icon.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_file_icon.ggCurrentLogicStateVisible == 0) {
			me._ht_video_file_icon.visible=false;
			me._ht_video_file_icon.userData.visible=false;
				}
				else {
			me._ht_video_file_icon.visible=((!me._ht_video_file_icon.material && Number(me._ht_video_file_icon.userData.opacity>0)) || Number(me._ht_video_file_icon.material.opacity)>0)?true:false;
			me._ht_video_file_icon.userData.visible=true;
				}
			}
		}
		me._ht_video_file_icon.logicBlock_visible();
		me._ht_video_file_icon.userData.onclick=function (e) {
			player.setVariableValue('vis_video_file_hotspots', player.getVariableValue('vis_video_file_hotspots') + "<"+me.hotspot.id+">");
			me._ht_video_file_video.userData.ggInitMedia(player._(me.hotspot.url));
		}
		me._ht_video_file_icon.userData.onmouseenter=function (e) {
			me.elementMouseOver['ht_video_file_icon']=true;
			me._ht_video_file_tooltip.logicBlock_visible();
			me._ht_video_file_icon.logicBlock_scaling();
		}
		me._ht_video_file_icon.userData.ontouchend=function (e) {
			me._ht_video_file_icon.logicBlock_scaling();
		}
		me._ht_video_file_icon.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_video_file_icon']=false;
			me._ht_video_file_tooltip.logicBlock_visible();
			me._ht_video_file_icon.logicBlock_scaling();
		}
		me._ht_video_file_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(1, 0.22, 5, 5 );
		geometry.name = 'ht_video_file_tooltip_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_file_tooltip_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.85098;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_file_tooltip.material.opacity = v;
			if (me._ht_video_file_tooltip.userData.hasScrollbar) {
				me._ht_video_file_tooltip.userData.scrollbar.material.opacity = v;
				me._ht_video_file_tooltip.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_video_file_tooltip.userData.ggSubElement) {
				me._ht_video_file_tooltip.userData.ggSubElement.material.opacity = v
				me._ht_video_file_tooltip.userData.ggSubElement.visible = (v>0 && me._ht_video_file_tooltip.userData.visible);
			}
			me._ht_video_file_tooltip.visible = (v>0 && me._ht_video_file_tooltip.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_file_tooltip.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_file_tooltip.userData.backgroundColorAlpha = v;
			me._ht_video_file_tooltip.userData.setOpacity(me._ht_video_file_tooltip.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.365);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 100;
		el.userData.height = 22;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_tooltip';
		el.userData.x = 0;
		el.userData.y = -0.365;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_tooltip.visible
			let parentEl = me._ht_video_file_tooltip.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_tooltip.userData.opacity = v;
			v = v * me._ht_video_file_tooltip.userData.parentOpacity;
			me._ht_video_file_tooltip.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_tooltip.children.length; i++) {
				let child = me._ht_video_file_tooltip.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_tooltip.userData.parentOpacity = v;
			v = v * me._ht_video_file_tooltip.userData.opacity
			me._ht_video_file_tooltip.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_tooltip.children.length; i++) {
				let child = me._ht_video_file_tooltip.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_tooltip = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(0.0862745, 0.0784314, 0.0666667).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0.945098, 0.901961, 0.811765).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 200;
		canvas.height = 44;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_video_file_tooltip.userData.totalHeightCanv = 2 * (13);
			me._ht_video_file_tooltip.userData.textLines = [];
			var ctx = me._ht_video_file_tooltip.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_video_file_tooltip.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_video_file_tooltip.userData.textLines.push(line);
					line = '';
					me._ht_video_file_tooltip.userData.totalHeightCanv += me._ht_video_file_tooltip.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._ht_video_file_tooltip.userData.width - 10 - (scrollbar ? 25 : 0))) && i > 0) {
					me._ht_video_file_tooltip.userData.textLines.push(line);
					line = words[i];
					me._ht_video_file_tooltip.userData.totalHeightCanv += me._ht_video_file_tooltip.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._ht_video_file_tooltip.userData.textLines.push(line);
			me._ht_video_file_tooltip.userData.totalHeightCanv += me._ht_video_file_tooltip.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_video_file_tooltip.userData.textCanvas;
			var ctx = me._ht_video_file_tooltip.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_video_file_tooltip.userData.backgroundColor.r * 255 + ', ' + me._ht_video_file_tooltip.userData.backgroundColor.g * 255 + ', ' + me._ht_video_file_tooltip.userData.backgroundColor.b * 255 + ', ' + me._ht_video_file_tooltip.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_video_file_tooltip.userData.textColor.r * 255 + ', ' + me._ht_video_file_tooltip.userData.textColor.g * 255 + ', ' + me._ht_video_file_tooltip.userData.textColor.b * 255 + ', ' + me._ht_video_file_tooltip.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_video_file_tooltip.userData.boxWidthCanv - (me._ht_video_file_tooltip.userData.hasScrollbar ? 50 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 2 * 8;
			for (var i = 0; i < me._ht_video_file_tooltip.userData.textLines.length; i++) {
				ctx.fillText(me._ht_video_file_tooltip.userData.textLines[i], x, y);
				y += me._ht_video_file_tooltip.userData.lineHeightCanv;
			}
			geometry = new THREE.PlaneGeometry(me._ht_video_file_tooltip.userData.boxWidthCanv / 200.0, me._ht_video_file_tooltip.userData.boxHeightCanv / 200.0, 5, 5 );
			geometry.name = 'ht_video_file_tooltip_geometry';
			me._ht_video_file_tooltip.geometry.dispose();
			me._ht_video_file_tooltip.geometry = geometry;
			var diffY = (me._ht_video_file_tooltip.userData.boxHeightCanv / 2) - me._ht_video_file_tooltip.userData.height;
			me._ht_video_file_tooltip.position.y = me._ht_video_file_tooltip.userData.y - ((diffY / 2.0) / 100.0);
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_video_file_tooltip_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_video_file_tooltip.material.map) {
				me._ht_video_file_tooltip.material.map.dispose();
			}
			me._ht_video_file_tooltip.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._ht_video_file_tooltip.children.length; i++) {
				let child = me._ht_video_file_tooltip.children[i];
				if (child.name.includes('scrollbar')) me._ht_video_file_tooltip.remove(child);
			}
			var canv = me._ht_video_file_tooltip.userData.textCanvas;
			var ctx = me._ht_video_file_tooltip.userData.textCanvasContext;
			ctx.font = '36px Verdana';
			me._ht_video_file_tooltip.userData.lineHeightCanv = 36 * 1.2;
			me._ht_video_file_tooltip.userData.textLines = [];
			me._ht_video_file_tooltip.userData.textLines.push(me._ht_video_file_tooltip.userData.ggText);
			me._ht_video_file_tooltip.userData.totalHeightCanv = 2 * (13);
			me._ht_video_file_tooltip.userData.totalHeightCanv += me._ht_video_file_tooltip.userData.lineHeightCanv;
			me._ht_video_file_tooltip.userData.boxWidthCanv = ctx.measureText(me._ht_video_file_tooltip.userData.ggText).width + (2 * 10);
			me._ht_video_file_tooltip.userData.boxHeightCanv = me._ht_video_file_tooltip.userData.totalHeightCanv;
			canv.width = me._ht_video_file_tooltip.userData.boxWidthCanv;
			canv.height = me._ht_video_file_tooltip.userData.boxHeightCanv;
			ctx.font = '36px Verdana';
			me._ht_video_file_tooltip.userData.ggPaintCanvasText();
		}
		me._ht_video_file_tooltip.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_video_file_tooltip.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_video_file_tooltip.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_file_tooltip.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_file_tooltip.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_video_file_tooltip.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_video_file_tooltip.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_video_file_tooltip";
		me._ht_video_file_tooltip.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_video_file_icon'] == true)) && 
				((player._(me.hotspot.title) != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_file_tooltip.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_file_tooltip.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_file_tooltip.ggCurrentLogicStateVisible == 0) {
			me._ht_video_file_tooltip.visible=((!me._ht_video_file_tooltip.material && Number(me._ht_video_file_tooltip.userData.opacity>0)) || Number(me._ht_video_file_tooltip.material.opacity)>0)?true:false;
			me._ht_video_file_tooltip.userData.visible=true;
				}
				else {
			me._ht_video_file_tooltip.visible=false;
			me._ht_video_file_tooltip.userData.visible=false;
				}
			}
		}
		me._ht_video_file_tooltip.logicBlock_visible();
		me._ht_video_file_tooltip.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_file_icon.add(me._ht_video_file_tooltip);
		me._ht_video_file.add(me._ht_video_file_icon);
		geometry = new THREE.PlaneGeometry(3.6, 2.4, 5, 5 );
		geometry.name = 'ht_video_file_bg_geometry';
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.0862745, 0.0784314, 0.0666667).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_file_bg_material';
		el = new THREE.Mesh( geometry, material );
		width = 3.6;
		height = 2.4;
		borderShape = new THREE.Shape();
		borderShape.moveTo((-width / 2.0) - 0.02 + 0, (height / 2.0) + 0.02);
		borderShape.lineTo((width / 2.0) + 0.02 - 0, (height / 2.0) + 0.02);
		borderShape.lineTo((width / 2.0) + 0.02, (-height / 2.0) - 0.02 + 0);
		borderShape.lineTo((-width / 2.0) - 0.02 + 0, (-height / 2.0) - 0.02);
		borderShape.lineTo((-width / 2.0) - 0.02, (height / 2.0) + 0.02 - 0);
		innerShape = new THREE.Path();
		innerShape.moveTo((-width / 2.0), (height / 2.0));
		innerShape.lineTo((width / 2.0), (height / 2.0));
		innerShape.lineTo((width / 2.0), (-height / 2.0));
		innerShape.lineTo((-width / 2.0), (-height / 2.0));
		borderShape.holes.push(innerShape);
		borderGeometry = new THREE.ShapeGeometry(borderShape);
		borderGeometry.name = 'ht_video_file_bg_borderGeometry';
		borderMaterial = new THREE.MeshBasicMaterial( {color: new THREE.Color(0.788235, 0.627451, 0.305882).convertSRGBToLinear(), side: THREE.DoubleSide, transparent: true } );
		borderMaterial.name = 'ht_video_file_bg_borderMaterial';
		el.userData.border = new THREE.Mesh( borderGeometry, borderMaterial );
		el.userData.border.name = 'ht_video_file_bg_borderMesh';
		el.add(el.userData.border);
		el.userData.backgroundColorAlpha = 0.85098;
		el.userData.borderColorAlpha = 0.85098;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_file_bg.material.opacity = v * me._ht_video_file_bg.userData.backgroundColorAlpha;
			me._ht_video_file_bg.userData.border.material.opacity = v * me._ht_video_file_bg.userData.borderColorAlpha;
			if (me._ht_video_file_bg.userData.ggSubElement) {
				me._ht_video_file_bg.userData.ggSubElement.material.opacity = v
				me._ht_video_file_bg.userData.ggSubElement.visible = (v>0 && me._ht_video_file_bg.userData.visible);
			}
			me._ht_video_file_bg.visible = (v>0 && me._ht_video_file_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_file_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_file_bg.userData.backgroundColorAlpha = v;
			me._ht_video_file_bg.userData.setOpacity(me._ht_video_file_bg.userData.opacity);
		}
		el.userData.setBorderColor = function(v) {
			me._ht_video_file_bg.userData.border.material.color = v;
		}
		el.userData.setBorderColorAlpha = function(v) {
			me._ht_video_file_bg.userData.borderColorAlpha = v;
			me._ht_video_file_bg.userData.setOpacity(me._ht_video_file_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(1.188);
		el.scale.set(1.00, 0.01, 1.0);
		el.userData.width = 360;
		el.userData.height = 240;
		el.userData.scale = {x: 1.00, y: 0.01, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 1.188;
		el.name = 'ht_video_file_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_bg.visible
			let parentEl = me._ht_video_file_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_bg.userData.opacity = v;
			v = v * me._ht_video_file_bg.userData.parentOpacity;
			me._ht_video_file_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_bg.children.length; i++) {
				let child = me._ht_video_file_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_bg.userData.parentOpacity = v;
			v = v * me._ht_video_file_bg.userData.opacity
			me._ht_video_file_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_bg.children.length; i++) {
				let child = me._ht_video_file_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_bg = el;
		el.userData.ggId="ht_video_file_bg";
		me._ht_video_file_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				(((player.getVariableValue('vis_video_file_hotspots') !== null) && (player.getVariableValue('vis_video_file_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_file_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_file_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_file_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_video_file_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_file_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_bg.userData.transitions[i].interval);
							me._ht_video_file_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_file_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_bg.scale.set(transition_scale.startScale.x + (me._ht_video_file_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_bg.position.x = (me._ht_video_file_bg.position.x - me._ht_video_file_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_bg.position.y = (me._ht_video_file_bg.position.y - me._ht_video_file_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_bg.userData.transitions.splice(me._ht_video_file_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_file_bg.userData.transitionValue_scale = {x: 1, y: 0.01, z: 1.0};
					for (var i = 0; i < me._ht_video_file_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_bg.userData.transitions[i].interval);
							me._ht_video_file_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_file_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_bg.scale.set(transition_scale.startScale.x + (me._ht_video_file_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_bg.position.x = (me._ht_video_file_bg.position.x - me._ht_video_file_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_bg.position.y = (me._ht_video_file_bg.position.y - me._ht_video_file_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_bg.userData.transitions.splice(me._ht_video_file_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_file_bg.logicBlock_scaling();
		me._ht_video_file_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('vis_video_file_hotspots') !== null) && (player.getVariableValue('vis_video_file_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_file_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_file_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_file_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_file_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_file_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_bg.userData.transitions[i].interval);
							me._ht_video_file_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_bg.material ? me._ht_video_file_bg.material.opacity : me._ht_video_file_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_bg.userData.transitions.splice(me._ht_video_file_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_file_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_file_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_bg.userData.transitions[i].interval);
							me._ht_video_file_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_bg.material ? me._ht_video_file_bg.material.opacity : me._ht_video_file_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_bg.userData.transitions.splice(me._ht_video_file_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_file_bg.logicBlock_alpha();
		me._ht_video_file_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(3.4, 2.2, 5, 5 );
		geometry.name = 'ht_video_file_video_geometry';
		material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_file_video_material';
		el = new THREE.Mesh( geometry, material );
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 340;
		el.userData.height = 220;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_video';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_file_video.material) me._ht_video_file_video.material.opacity = v;
			me._ht_video_file_video.visible = (v>0 && me._ht_video_file_video.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_video.visible
			let parentEl = me._ht_video_file_video.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_video.userData.opacity = v;
			v = v * me._ht_video_file_video.userData.parentOpacity;
			me._ht_video_file_video.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_video.children.length; i++) {
				let child = me._ht_video_file_video.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_video.userData.parentOpacity = v;
			v = v * me._ht_video_file_video.userData.opacity
			me._ht_video_file_video.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_video.children.length; i++) {
				let child = me._ht_video_file_video.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_video = el;
		me._ht_video_file_video.userData.seekbars = [];
		me._ht_video_file_video.userData.ggInitMedia = function(media) {
			if (me._ht_video_file_video__vid) me._ht_video_file_video__vid.pause();
			me._ht_video_file_video__vid = document.createElement('video');
			player.registerVideoElement('ht_video_file_video', me._ht_video_file_video__vid);
			me._ht_video_file_video__vid.setAttribute('autoplay', '');
			me._ht_video_file_video__vid.setAttribute('crossOrigin', 'anonymous');
			me._ht_video_file_video__source = document.createElement('source');
			me._ht_video_file_video__source.setAttribute('src', media);
			me._ht_video_file_video__vid.addEventListener('loadedmetadata', function() {
				let videoAR = me._ht_video_file_video__vid.videoWidth / me._ht_video_file_video__vid.videoHeight;
				let elAR = me._ht_video_file_video.userData.width / me._ht_video_file_video.userData.height;
				if (videoAR > elAR) {
					me._ht_video_file_video.scale.set(1, (me._ht_video_file_video.userData.width / videoAR) / me._ht_video_file_video.userData.height, 1);
				} else {
					me._ht_video_file_video.scale.set((me._ht_video_file_video.userData.height * videoAR) / me._ht_video_file_video.userData.width, 1, 1);
				}
			}, false);
			me._ht_video_file_video__vid.appendChild(me._ht_video_file_video__source);
			videoTexture = new THREE.VideoTexture( me._ht_video_file_video__vid );
			videoTexture.name = 'ht_video_file_video_videoTexture';
			videoTexture.minFilter = THREE.LinearFilter;
			videoTexture.magFilter = THREE.LinearFilter;
			videoTexture.format = THREE.RGBAFormat;
			videoMaterial = new THREE.MeshBasicMaterial( {map: videoTexture, side: THREE.DoubleSide, transparent: true} );
			videoMaterial.name = 'ht_video_file_video_videoMaterial';
			videoMaterial.alphaTest = 0.5;
			me._ht_video_file_video.material = videoMaterial;
		}
		el.userData.ggId="ht_video_file_video";
		me._ht_video_file_video.userData.ggIsActive=function() {
			if (me._ht_video_file_video__vid != null) {
				return (me._ht_video_file_video__vid.paused == false && me._ht_video_file_video__vid.ended == false);
			} else {
				return false;
			}
		}
		me._ht_video_file_video.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(((player.getVariableValue('vis_video_file_hotspots') !== null) && (player.getVariableValue('vis_video_file_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_file_video.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_file_video.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_file_video.ggCurrentLogicStateVisible == 0) {
			me._ht_video_file_video.visible=((!me._ht_video_file_video.material && Number(me._ht_video_file_video.userData.opacity>0)) || Number(me._ht_video_file_video.material.opacity)>0)?true:false;
			me._ht_video_file_video.userData.visible=true;
					if (me._ht_video_file_video.userData.ggVideoNotLoaded) {
						me._ht_video_file_video.userData.ggInitMedia(me._ht_video_file_video.ggVideoSource);
					}
				}
				else {
			me._ht_video_file_video.visible=false;
			me._ht_video_file_video.userData.visible=false;
					me._ht_video_file_video.userData.ggInitMedia('');
				}
			}
		}
		me._ht_video_file_video.logicBlock_visible();
		me._ht_video_file_video.userData.onclick=function (e) {
			player.playPauseSound("ht_video_file_video","1");
		}
		me._ht_video_file_video.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_file_bg.add(me._ht_video_file_video);
		me._ht_video_file.add(me._ht_video_file_bg);
		geometry = new THREE.PlaneGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'ht_video_file_close_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_file_close_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(2.1);
		el.translateY(0.975);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_close';
		el.userData.x = 2.1;
		el.userData.y = 0.975;
		el.userData.hanchor = 1;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_file_close.material) me._ht_video_file_close.material.opacity = v;
			me._ht_video_file_close.visible = (v>0 && me._ht_video_file_close.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_close.visible
			let parentEl = me._ht_video_file_close.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_close.userData.opacity = v;
			v = v * me._ht_video_file_close.userData.parentOpacity;
			me._ht_video_file_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_close.children.length; i++) {
				let child = me._ht_video_file_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_close.userData.parentOpacity = v;
			v = v * me._ht_video_file_close.userData.opacity
			me._ht_video_file_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_close.children.length; i++) {
				let child = me._ht_video_file_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_close = el;
		el.userData.ggId="ht_video_file_close";
		me._ht_video_file_close.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_video_file_close'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_file_close.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_file_close.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_file_close.ggCurrentLogicStateScaling == 0) {
					me._ht_video_file_close.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._ht_video_file_close.userData.transitions.length; i++) {
						if (me._ht_video_file_close.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_close.userData.transitions[i].interval);
							me._ht_video_file_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_file_close.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_close.scale.set(transition_scale.startScale.x + (me._ht_video_file_close.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_close.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_close.position.x = (me._ht_video_file_close.position.x - me._ht_video_file_close.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_close.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_close.position.y = (me._ht_video_file_close.position.y - me._ht_video_file_close.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_close.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_close.userData.transitions.splice(me._ht_video_file_close.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_close.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_file_close.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_file_close.userData.transitions.length; i++) {
						if (me._ht_video_file_close.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_close.userData.transitions[i].interval);
							me._ht_video_file_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_video_file_close.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_close.scale.set(transition_scale.startScale.x + (me._ht_video_file_close.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_close.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_close.position.x = (me._ht_video_file_close.position.x - me._ht_video_file_close.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_close.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_close.position.y = (me._ht_video_file_close.position.y - me._ht_video_file_close.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_close.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_close.userData.transitions.splice(me._ht_video_file_close.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_close.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_file_close.logicBlock_scaling();
		me._ht_video_file_close.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('vis_video_file_hotspots') !== null) && (player.getVariableValue('vis_video_file_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_file_close.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_file_close.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_file_close.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_file_close.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_file_close.userData.transitions.length; i++) {
						if (me._ht_video_file_close.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_close.userData.transitions[i].interval);
							me._ht_video_file_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_close.material ? me._ht_video_file_close.material.opacity : me._ht_video_file_close.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_close.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_close.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_close.userData.transitions.splice(me._ht_video_file_close.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_close.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_file_close.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_file_close.userData.transitions.length; i++) {
						if (me._ht_video_file_close.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_close.userData.transitions[i].interval);
							me._ht_video_file_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_close.material ? me._ht_video_file_close.material.opacity : me._ht_video_file_close.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_close.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_close.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_close.userData.transitions.splice(me._ht_video_file_close.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_close.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_file_close.logicBlock_alpha();
		me._ht_video_file_close.userData.onclick=function (e) {
			player.setVariableValue('vis_video_file_hotspots', player.getVariableValue('vis_video_file_hotspots').replace("<"+me.hotspot.id+">", ''));
		}
		me._ht_video_file_close.userData.onmouseenter=function (e) {
			me.elementMouseOver['ht_video_file_close']=true;
			me._ht_video_file_close.logicBlock_scaling();
		}
		me._ht_video_file_close.userData.ontouchend=function (e) {
			me._ht_video_file_close.logicBlock_scaling();
		}
		me._ht_video_file_close.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_video_file_close']=false;
			me._ht_video_file_close.logicBlock_scaling();
		}
		me._ht_video_file_close.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_file.add(me._ht_video_file_close);
		el = new THREE.Group();
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_file_customimage.userData.ggSubElement) {
				me._ht_video_file_customimage.userData.ggSubElement.material.opacity = v
				me._ht_video_file_customimage.userData.ggSubElement.visible = (v>0 && me._ht_video_file_customimage.userData.visible);
			}
			me._ht_video_file_customimage.visible = (v>0 && me._ht_video_file_customimage.userData.visible);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 50;
		el.userData.height = 50;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_CustomImage';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_customimage.visible
			let parentEl = me._ht_video_file_customimage.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_customimage.userData.opacity = v;
			v = v * me._ht_video_file_customimage.userData.parentOpacity;
			me._ht_video_file_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_customimage.children.length; i++) {
				let child = me._ht_video_file_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_customimage.userData.parentOpacity = v;
			v = v * me._ht_video_file_customimage.userData.opacity
			me._ht_video_file_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_customimage.children.length; i++) {
				let child = me._ht_video_file_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_customimage = el;
		currentWidth = 50;
		currentHeight = 50;
		var img = {};
		img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
		img.geometry.name = 'ht_video_file_CustomImage_imgGeometry';
		loader = new THREE.TextureLoader();
		el.userData.ggSetUrl = function(extUrl) {
			loader.load(extUrl,
				function (texture) {
				texture.colorSpace = player.getVRTextureColorSpace();
				var loadedMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
				loadedMaterial.name = 'ht_video_file_CustomImage_subElementMaterial';
				me._ht_video_file_customimage.userData.ggSubElement.material = loadedMaterial;
				me._ht_video_file_customimage.userData.ggUpdatePosition();
				me._ht_video_file_customimage.userData.ggText = extUrl;
				me._ht_video_file_customimage.userData.setOpacity(me._ht_video_file_customimage.userData.opacity);
			});
		};
		if ((hotspot) && (hotspot.customimage)) {
			var extUrl=hotspot.customimage;
		}
		el.userData.ggSetUrl(extUrl);
		material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true } );
		material.name = 'ht_video_file_CustomImage_subElementMaterial';
		el.userData.ggSubElement = new THREE.Mesh( img.geometry, material );
		el.userData.ggSubElement.name = 'ht_video_file_CustomImage_subElement';
		el.userData.ggSubElement.position.z = el.position.z + 0.005;
		el.add(el.userData.ggSubElement);
		el.userData.clientWidth = 50;
		el.userData.clientHeight = 50;
		el.userData.ggId="ht_video_file_CustomImage";
		me._ht_video_file_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(((player.getVariableValue('vis_video_file_hotspots') !== null) && (player.getVariableValue('vis_video_file_hotspots')).indexOf("<"+me.hotspot.id+">") == -1)) && 
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_file_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_file_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_file_customimage.ggCurrentLogicStateVisible == 0) {
			me._ht_video_file_customimage.visible=((!me._ht_video_file_customimage.material && Number(me._ht_video_file_customimage.userData.opacity>0)) || Number(me._ht_video_file_customimage.material.opacity)>0)?true:false;
			me._ht_video_file_customimage.userData.visible=true;
				}
				else {
			me._ht_video_file_customimage.visible=false;
			me._ht_video_file_customimage.userData.visible=false;
				}
			}
		}
		me._ht_video_file_customimage.logicBlock_visible();
		me._ht_video_file_customimage.userData.onclick=function (e) {
			player.setVariableValue('vis_video_file_hotspots', player.getVariableValue('vis_video_file_hotspots') + "<"+me.hotspot.id+">");
			me._ht_video_file_video.userData.ggInitMedia(player._(me.hotspot.url));
		}
		me._ht_video_file_customimage.userData.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_video_file_customimage.userData.clientWidth;
			var parentHeight = me._ht_video_file_customimage.userData.clientHeight;
			var img = me._ht_video_file_customimage.userData.ggSubElement;
			var imgWidth = img.material.map.image.naturalWidth;
			var imgHeight = img.material.map.image.naturalHeight;
			var aspectRatioDiv = parentWidth / parentHeight;
			var aspectRatioImg = imgWidth / imgHeight;
			if (imgWidth < parentWidth) parentWidth = imgWidth;
			if (imgHeight < parentHeight) parentHeight = imgHeight;
			var currentWidth, currentHeight;
			img.geometry.dispose();
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
			img.geometry.name = 'ht_video_file_CustomImage_imgGeometry';
			}
		}
		me._ht_video_file.add(me._ht_video_file_customimage);
		me._ht_video_file.userData.setOpacity(1.00);
		me.elementMouseOver['ht_video_file']=false;
		me._ht_video_file_icon.logicBlock_scaling();
		me._ht_video_file_icon.logicBlock_visible();
		me._ht_video_file_icon.userData.setOpacity(1.00);
		me.elementMouseOver['ht_video_file_icon']=false;
		me._ht_video_file_tooltip.logicBlock_visible();
		me._ht_video_file_tooltip.userData.setOpacity(1.00);
		me._ht_video_file_bg.logicBlock_scaling();
		me._ht_video_file_bg.logicBlock_alpha();
		me._ht_video_file_bg.userData.setOpacity(0.00);
		me._ht_video_file_video.logicBlock_visible();
		me._ht_video_file_video.userData.setOpacity(1.00);
		me._ht_video_file_video.userData.ggVideoSource = 'media_vr/';
		me._ht_video_file_video.userData.ggVideoNotLoaded = true;
		me._ht_video_file_close.logicBlock_scaling();
		me._ht_video_file_close.logicBlock_alpha();
		me._ht_video_file_close.userData.setOpacity(0.00);
		me.elementMouseOver['ht_video_file_close']=false;
		me._ht_video_file_customimage.logicBlock_visible();
		me._ht_video_file_customimage.userData.setOpacity(1.00);
			me.ggEvent_activehotspotchanged=function() {
				me._ht_video_file_icon.logicBlock_visible();
				me._ht_video_file_tooltip.logicBlock_visible();
				me._ht_video_file_customimage.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._ht_video_file_icon.logicBlock_visible();
					me._ht_video_file_tooltip.userData.ggUpdateText();
				me._ht_video_file_tooltip.logicBlock_visible();
				me._ht_video_file_bg.logicBlock_scaling();
				me._ht_video_file_bg.logicBlock_alpha();
				me._ht_video_file_video.logicBlock_visible();
				me._ht_video_file_close.logicBlock_alpha();
				me._ht_video_file_customimage.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._ht_video_file_icon.logicBlock_visible();
				me._ht_video_file_tooltip.logicBlock_visible();
				me._ht_video_file_bg.logicBlock_scaling();
				me._ht_video_file_bg.logicBlock_alpha();
				me._ht_video_file_video.logicBlock_visible();
				me._ht_video_file_close.logicBlock_alpha();
				me._ht_video_file_customimage.logicBlock_visible();
			};
			me.ggEvent_varchanged_vis_video_file_hotspots=function() {
				me._ht_video_file_icon.logicBlock_visible();
				me._ht_video_file_bg.logicBlock_scaling();
				me._ht_video_file_bg.logicBlock_alpha();
				me._ht_video_file_video.logicBlock_visible();
				me._ht_video_file_close.logicBlock_alpha();
				me._ht_video_file_customimage.logicBlock_visible();
			};
			me.__obj = me._ht_video_file;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	function SkinHotspotClass_ht_node(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_node';
		el.userData.x = -2;
		el.userData.y = 1;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_node.visible
			let parentEl = me._ht_node.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node.userData.opacity = v;
			v = v * me._ht_node.userData.parentOpacity;
			me._ht_node.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node.children.length; i++) {
				let child = me._ht_node.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node.userData.parentOpacity = v;
			v = v * me._ht_node.userData.opacity
			me._ht_node.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node.children.length; i++) {
				let child = me._ht_node.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node = el;
		el.userData.ggId="ht_node";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_node.userData.onclick=function (e) {
			player.openNext(player._(me.hotspot.url),player._(me.hotspot.target));
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.userData.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_node']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
			player.setActiveHotspot(null);
		}
		me._ht_node.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.6, 0.8, 5, 5 );
		geometry.name = 'ht_node_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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'+
	'HcQQAAAABJRU5ErkJggg==');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_node_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(-0.01);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 60;
		el.userData.height = 80;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_node_icon';
		el.userData.x = 0;
		el.userData.y = -0.01;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_node_icon.material) me._ht_node_icon.material.opacity = v;
			me._ht_node_icon.visible = (v>0 && me._ht_node_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_node_icon.visible
			let parentEl = me._ht_node_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node_icon.userData.opacity = v;
			v = v * me._ht_node_icon.userData.parentOpacity;
			me._ht_node_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_icon.children.length; i++) {
				let child = me._ht_node_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node_icon.userData.parentOpacity = v;
			v = v * me._ht_node_icon.userData.opacity
			me._ht_node_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_icon.children.length; i++) {
				let child = me._ht_node_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node_icon = el;
		el.userData.ggId="ht_node_icon";
		me._ht_node_icon.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_node_icon'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_node_icon.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_node_icon.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_node_icon.ggCurrentLogicStateScaling == 0) {
					me._ht_node_icon.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._ht_node_icon.userData.transitions.length; i++) {
						if (me._ht_node_icon.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_node_icon.userData.transitions[i].interval);
							me._ht_node_icon.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_node_icon.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_node_icon.scale.set(transition_scale.startScale.x + (me._ht_node_icon.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_node_icon.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_node_icon.position.x = (me._ht_node_icon.position.x - me._ht_node_icon.userData.curScaleOffX) + scaleOffX;
						me._ht_node_icon.userData.curScaleOffX = scaleOffX;
						me._ht_node_icon.position.y = (me._ht_node_icon.position.y - me._ht_node_icon.userData.curScaleOffY) + scaleOffY;
						me._ht_node_icon.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_node_icon.userData.transitions.splice(me._ht_node_icon.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_node_icon.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_node_icon.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_node_icon.userData.transitions.length; i++) {
						if (me._ht_node_icon.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_node_icon.userData.transitions[i].interval);
							me._ht_node_icon.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_node_icon.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_node_icon.scale.set(transition_scale.startScale.x + (me._ht_node_icon.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_node_icon.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_node_icon.position.x = (me._ht_node_icon.position.x - me._ht_node_icon.userData.curScaleOffX) + scaleOffX;
						me._ht_node_icon.userData.curScaleOffX = scaleOffX;
						me._ht_node_icon.position.y = (me._ht_node_icon.position.y - me._ht_node_icon.userData.curScaleOffY) + scaleOffY;
						me._ht_node_icon.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_node_icon.userData.transitions.splice(me._ht_node_icon.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_node_icon.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_node_icon.logicBlock_scaling();
		me._ht_node_icon.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_node_icon.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_node_icon.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_node_icon.ggCurrentLogicStateVisible == 0) {
			me._ht_node_icon.visible=false;
			me._ht_node_icon.userData.visible=false;
				}
				else {
			me._ht_node_icon.visible=((!me._ht_node_icon.material && Number(me._ht_node_icon.userData.opacity>0)) || Number(me._ht_node_icon.material.opacity)>0)?true:false;
			me._ht_node_icon.userData.visible=true;
				}
			}
		}
		me._ht_node_icon.logicBlock_visible();
		me._ht_node_icon.userData.onmouseenter=function (e) {
			me.elementMouseOver['ht_node_icon']=true;
			me._vr_halo.logicBlock_visible();
			me._ht_node_icon.logicBlock_scaling();
		}
		me._ht_node_icon.userData.ontouchend=function (e) {
			me._ht_node_icon.logicBlock_scaling();
		}
		me._ht_node_icon.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_node_icon']=false;
			me._vr_halo.logicBlock_visible();
			me._ht_node_icon.logicBlock_scaling();
		}
		me._ht_node_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 1.9;
		height = 1.9;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.92, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.92, (height / 2.0));
		roundedRectShape.arc(0, -0.92, 0.92, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.92);
		roundedRectShape.arc(-0.92, 0, 0.92, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.92, (-height / 2.0));
		roundedRectShape.arc(0, 0.92, 0.92, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.92);
		roundedRectShape.arc(0.92, 0, 0.92, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'vr_halo_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.14902, 0.141176, 0.133333).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'vr_halo_material';
		el = new THREE.Mesh( geometry, material );
		width = 1.9;
		height = 1.9;
		borderShape = new THREE.Shape();
		borderShape.moveTo((-width / 2.0) - 0.03 + 0.95, (height / 2.0) + 0.03);
		borderShape.lineTo((width / 2.0) + 0.03 - 0.95, (height / 2.0) + 0.03);
		borderShape.arc(0, -0.95, 0.95, Math.PI / 2.0, 2.0 * Math.PI, true);
		borderShape.lineTo((width / 2.0) + 0.03, (-height / 2.0) - 0.03 + 0.95);
		borderShape.arc(-0.95, 0, 0.95, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		borderShape.lineTo((-width / 2.0) - 0.03 + 0.95, (-height / 2.0) - 0.03);
		borderShape.arc(0, 0.95, 0.95, 3.0 * Math.PI / 2.0, Math.PI, true);
		borderShape.lineTo((-width / 2.0) - 0.03, (height / 2.0) + 0.03 - 0.95);
		borderShape.arc(0.95, 0, 0.95, Math.PI, Math.PI / 2.0, true);
		innerShape = new THREE.Path();
		innerShape.moveTo((-width / 2.0) + 0.92, (height / 2.0));
		innerShape.lineTo((width / 2.0) - 0.92, (height / 2.0));
		innerShape.arc(0, -0.92, 0.92, Math.PI / 2.0, 2.0 * Math.PI, true);
		innerShape.lineTo((width / 2.0), (-height / 2.0) + 0.92);
		innerShape.arc(-0.92, 0, 0.92, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		innerShape.lineTo((-width / 2.0) + 0.92, (-height / 2.0));
		innerShape.arc(0, 0.92, 0.92, 3.0 * Math.PI / 2.0, Math.PI, true);
		innerShape.lineTo((-width / 2.0), (height / 2.0) - 0.92);
		innerShape.arc(0.92, 0, 0.92, Math.PI, Math.PI / 2.0, true);
		borderShape.holes.push(innerShape);
		borderGeometry = new THREE.ShapeGeometry(borderShape);
		borderGeometry.name = 'vr_halo_borderGeometry';
		borderMaterial = new THREE.MeshBasicMaterial( {color: new THREE.Color(0.788235, 0.627451, 0.305882).convertSRGBToLinear(), side: THREE.DoubleSide, transparent: true } );
		borderMaterial.name = 'vr_halo_borderMaterial';
		el.userData.border = new THREE.Mesh( borderGeometry, borderMaterial );
		el.userData.border.name = 'vr_halo_borderMesh';
		el.add(el.userData.border);
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._vr_halo.material.opacity = v * me._vr_halo.userData.backgroundColorAlpha;
			me._vr_halo.userData.border.material.opacity = v * me._vr_halo.userData.borderColorAlpha;
			if (me._vr_halo.userData.ggSubElement) {
				me._vr_halo.userData.ggSubElement.material.opacity = v
				me._vr_halo.userData.ggSubElement.visible = (v>0 && me._vr_halo.userData.visible);
			}
			me._vr_halo.visible = (v>0 && me._vr_halo.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._vr_halo.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._vr_halo.userData.backgroundColorAlpha = v;
			me._vr_halo.userData.setOpacity(me._vr_halo.userData.opacity);
		}
		el.userData.setBorderColor = function(v) {
			me._vr_halo.userData.border.material.color = v;
		}
		el.userData.setBorderColorAlpha = function(v) {
			me._vr_halo.userData.borderColorAlpha = v;
			me._vr_halo.userData.setOpacity(me._vr_halo.userData.opacity);
		}
		el.translateX(0);
		el.translateY(1.7);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 190;
		el.userData.height = 190;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'vr_halo';
		el.userData.x = 0;
		el.userData.y = 1.7;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._vr_halo.visible
			let parentEl = me._vr_halo.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vr_halo.userData.opacity = v;
			v = v * me._vr_halo.userData.parentOpacity;
			me._vr_halo.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_halo.children.length; i++) {
				let child = me._vr_halo.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vr_halo.userData.parentOpacity = v;
			v = v * me._vr_halo.userData.opacity
			me._vr_halo.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_halo.children.length; i++) {
				let child = me._vr_halo.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vr_halo = el;
		el.userData.ggId="vr_halo";
		me._vr_halo.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_node_icon'] == true)) && 
				((me.hotspot.customimage == ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._vr_halo.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._vr_halo.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._vr_halo.ggCurrentLogicStateVisible == 0) {
			me._vr_halo.visible=((!me._vr_halo.material && Number(me._vr_halo.userData.opacity>0)) || Number(me._vr_halo.material.opacity)>0)?true:false;
			me._vr_halo.userData.visible=true;
				}
				else {
			me._vr_halo.visible=false;
			me._vr_halo.userData.visible=false;
				}
			}
		}
		me._vr_halo.logicBlock_visible();
		me._vr_halo.userData.ggUpdatePosition=function (useTransition) {
		}
		width = 1.82;
		height = 1.82;
		roundedRectShape = new THREE.Shape();
		roundedRectShape.moveTo((-width / 2.0) + 0.91, (height / 2.0));
		roundedRectShape.lineTo((width / 2.0) - 0.91, (height / 2.0));
		roundedRectShape.arc(0, -0.91, 0.91, Math.PI / 2.0, 2.0 * Math.PI, true);
		roundedRectShape.lineTo((width / 2.0), (-height / 2.0) + 0.91);
		roundedRectShape.arc(-0.91, 0, 0.91, 2.0 * Math.PI, 3.0 * Math.PI / 2.0, true);
		roundedRectShape.lineTo((-width / 2.0) + 0.91, (-height / 2.0));
		roundedRectShape.arc(0, 0.91, 0.91, 3.0 * Math.PI / 2.0, Math.PI, true);
		roundedRectShape.lineTo((-width / 2.0), (height / 2.0) - 0.91);
		roundedRectShape.arc(0.91, 0, 0.91, Math.PI, Math.PI / 2.0, true);
		geometry = new THREE.ShapeGeometry(roundedRectShape);
		geometry.name = 'vr_halo_slika_geometry';
		geometry.computeBoundingBox();
		var min = geometry.boundingBox.min;
		var max = geometry.boundingBox.max;
		var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
		var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
		var vertexPositions = geometry.getAttribute('position');
		var vertexUVs = geometry.getAttribute('uv');
		for (var i = 0; i < vertexPositions.count; i++) {
			var v1 = vertexPositions.getX(i);
			var	v2 = vertexPositions.getY(i);
			vertexUVs.setX(i, (v1 + offset.x) / range.x);
			vertexUVs.setY(i, (v2 + offset.y) / range.y);
		}
		geometry.uvsNeedUpdate = true;
		loader = new THREE.TextureLoader();
		el.userData.ggNodeId=nodeId;
		texture = loader.load(basePath + 'images_vr/vr_halo_slika_' + nodeId + '.jpg');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'vr_halo_slika_material';
		el = new THREE.Mesh( geometry, material );
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 182;
		el.userData.height = 182;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'vr_halo_slika';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._vr_halo_slika.material) me._vr_halo_slika.material.opacity = v;
			me._vr_halo_slika.visible = (v>0 && me._vr_halo_slika.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._vr_halo_slika.visible
			let parentEl = me._vr_halo_slika.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vr_halo_slika.userData.opacity = v;
			v = v * me._vr_halo_slika.userData.parentOpacity;
			me._vr_halo_slika.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_halo_slika.children.length; i++) {
				let child = me._vr_halo_slika.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vr_halo_slika.userData.parentOpacity = v;
			v = v * me._vr_halo_slika.userData.opacity
			me._vr_halo_slika.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_halo_slika.children.length; i++) {
				let child = me._vr_halo_slika.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vr_halo_slika = el;
		el.userData.ggId="vr_halo_slika";
		me._vr_halo_slika.userData.ggIsActive=function() {
			return player.getCurrentNode()==this.userData.ggElementNodeId();
		}
		el.userData.ggElementNodeId=function() {
			return this.userData.ggNodeId;
		}
		me._vr_halo_slika.userData.ggUpdatePosition=function (useTransition) {
		}
		me._vr_halo.add(me._vr_halo_slika);
		geometry = new THREE.PlaneGeometry(2.3, 0.4, 5, 5 );
		geometry.name = 'vr_halo_traka_geometry';
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.109804, 0.0980392, 0.0823529).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'vr_halo_traka_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._vr_halo_traka.material.opacity = v * me._vr_halo_traka.userData.backgroundColorAlpha;
			if (me._vr_halo_traka.userData.ggSubElement) {
				me._vr_halo_traka.userData.ggSubElement.material.opacity = v
				me._vr_halo_traka.userData.ggSubElement.visible = (v>0 && me._vr_halo_traka.userData.visible);
			}
			me._vr_halo_traka.visible = (v>0 && me._vr_halo_traka.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._vr_halo_traka.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._vr_halo_traka.userData.backgroundColorAlpha = v;
			me._vr_halo_traka.userData.setOpacity(me._vr_halo_traka.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.95);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 230;
		el.userData.height = 40;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'vr_halo_traka';
		el.userData.x = 0;
		el.userData.y = -0.95;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._vr_halo_traka.visible
			let parentEl = me._vr_halo_traka.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vr_halo_traka.userData.opacity = v;
			v = v * me._vr_halo_traka.userData.parentOpacity;
			me._vr_halo_traka.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_halo_traka.children.length; i++) {
				let child = me._vr_halo_traka.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vr_halo_traka.userData.parentOpacity = v;
			v = v * me._vr_halo_traka.userData.opacity
			me._vr_halo_traka.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_halo_traka.children.length; i++) {
				let child = me._vr_halo_traka.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vr_halo_traka = el;
		el.userData.ggId="vr_halo_traka";
		me._vr_halo_traka.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(2.3, 0.4, 5, 5 );
		geometry.name = 'vr_halo_naziv_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'vr_halo_naziv_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._vr_halo_naziv.material.opacity = v;
			if (me._vr_halo_naziv.userData.hasScrollbar) {
				me._vr_halo_naziv.userData.scrollbar.material.opacity = v;
				me._vr_halo_naziv.userData.scrollbarBg.material.opacity = v;
			}
			if (me._vr_halo_naziv.userData.ggSubElement) {
				me._vr_halo_naziv.userData.ggSubElement.material.opacity = v
				me._vr_halo_naziv.userData.ggSubElement.visible = (v>0 && me._vr_halo_naziv.userData.visible);
			}
			me._vr_halo_naziv.visible = (v>0 && me._vr_halo_naziv.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._vr_halo_naziv.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._vr_halo_naziv.userData.backgroundColorAlpha = v;
			me._vr_halo_naziv.userData.setOpacity(me._vr_halo_naziv.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 230;
		el.userData.height = 40;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'vr_halo_naziv';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.050);
		el.renderOrder = 5;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._vr_halo_naziv.visible
			let parentEl = me._vr_halo_naziv.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vr_halo_naziv.userData.opacity = v;
			v = v * me._vr_halo_naziv.userData.parentOpacity;
			me._vr_halo_naziv.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_halo_naziv.children.length; i++) {
				let child = me._vr_halo_naziv.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vr_halo_naziv.userData.parentOpacity = v;
			v = v * me._vr_halo_naziv.userData.opacity
			me._vr_halo_naziv.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_halo_naziv.children.length; i++) {
				let child = me._vr_halo_naziv.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vr_halo_naziv = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(1, 1, 1).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0.945098, 0.901961, 0.811765).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 460;
		canvas.height = 80;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._vr_halo_naziv.userData.totalHeightCanv = 2 * (3);
			me._vr_halo_naziv.userData.textLines = [];
			var ctx = me._vr_halo_naziv.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._vr_halo_naziv.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._vr_halo_naziv.userData.textLines.push(line);
					line = '';
					me._vr_halo_naziv.userData.totalHeightCanv += me._vr_halo_naziv.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._vr_halo_naziv.userData.width - 0 - (scrollbar ? 25 : 0))) && i > 0) {
					me._vr_halo_naziv.userData.textLines.push(line);
					line = words[i];
					me._vr_halo_naziv.userData.totalHeightCanv += me._vr_halo_naziv.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._vr_halo_naziv.userData.textLines.push(line);
			me._vr_halo_naziv.userData.totalHeightCanv += me._vr_halo_naziv.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._vr_halo_naziv.userData.textCanvas;
			var ctx = me._vr_halo_naziv.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._vr_halo_naziv.userData.textColor.r * 255 + ', ' + me._vr_halo_naziv.userData.textColor.g * 255 + ', ' + me._vr_halo_naziv.userData.textColor.b * 255 + ', ' + me._vr_halo_naziv.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._vr_halo_naziv.userData.boxWidthCanv - (me._vr_halo_naziv.userData.hasScrollbar ? 50 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 2 * 3;
			y += (canv.height - me._vr_halo_naziv.userData.totalHeightCanv - (2 * 0)) / 2;
			for (var i = 0; i < me._vr_halo_naziv.userData.textLines.length; i++) {
				var curTextLine = me._vr_halo_naziv.userData.textLines[i];
				var curTextLineBase = me._vr_halo_naziv.userData.textLines[i];
				if ((ctx.measureText(curTextLine).width + (2 * 0)) > canv.width) {
					var cutChars = 0;
					do {
						cutChars++;
						curTextLine = curTextLineBase.substring(0, curTextLineBase.length - cutChars) + '...';
					} while (cutChars < curTextLineBase.length && (ctx.measureText(curTextLine).width + (2 * 0)) > canv.width);
				}
				ctx.fillText(curTextLine, x, y);
				y += me._vr_halo_naziv.userData.lineHeightCanv;
			}
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'vr_halo_naziv_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._vr_halo_naziv.material.map) {
				me._vr_halo_naziv.material.map.dispose();
			}
			me._vr_halo_naziv.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._vr_halo_naziv.children.length; i++) {
				let child = me._vr_halo_naziv.children[i];
				if (child.name.includes('scrollbar')) me._vr_halo_naziv.remove(child);
			}
			var canv = me._vr_halo_naziv.userData.textCanvas;
			var ctx = me._vr_halo_naziv.userData.textCanvasContext;
			ctx.font = '44px Verdana';
			me._vr_halo_naziv.userData.lineHeightCanv = 44 * 1.2;
			me._vr_halo_naziv.userData.textLines = [];
			me._vr_halo_naziv.userData.textLines.push(me._vr_halo_naziv.userData.ggText);
			me._vr_halo_naziv.userData.totalHeightCanv = 2 * (3);
			me._vr_halo_naziv.userData.totalHeightCanv += me._vr_halo_naziv.userData.lineHeightCanv;
			me._vr_halo_naziv.userData.boxWidthCanv = 2 * me._vr_halo_naziv.userData.width;
			me._vr_halo_naziv.userData.boxHeightCanv = 2 * me._vr_halo_naziv.userData.height;
			me._vr_halo_naziv.userData.hasScrollbar = false;
			canv.width = me._vr_halo_naziv.userData.boxWidthCanv;
			canv.height = me._vr_halo_naziv.userData.boxHeightCanv;
			ctx.font = '44px Verdana';
			me._vr_halo_naziv.userData.ggPaintCanvasText();
		}
		me._vr_halo_naziv.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._vr_halo_naziv.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._vr_halo_naziv.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._vr_halo_naziv.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._vr_halo_naziv.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._vr_halo_naziv.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._vr_halo_naziv.userData.textColorAlpha = v;
		}
		el.userData.ggId="vr_halo_naziv";
		me._vr_halo_naziv.userData.ggUpdatePosition=function (useTransition) {
		}
		me._vr_halo_traka.add(me._vr_halo_naziv);
		geometry = new THREE.PlaneGeometry(2.3, 0.02, 5, 5 );
		geometry.name = 'vr_halo_linija_gore_geometry';
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.788235, 0.627451, 0.305882).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'vr_halo_linija_gore_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.85098;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._vr_halo_linija_gore.material.opacity = v * me._vr_halo_linija_gore.userData.backgroundColorAlpha;
			if (me._vr_halo_linija_gore.userData.ggSubElement) {
				me._vr_halo_linija_gore.userData.ggSubElement.material.opacity = v
				me._vr_halo_linija_gore.userData.ggSubElement.visible = (v>0 && me._vr_halo_linija_gore.userData.visible);
			}
			me._vr_halo_linija_gore.visible = (v>0 && me._vr_halo_linija_gore.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._vr_halo_linija_gore.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._vr_halo_linija_gore.userData.backgroundColorAlpha = v;
			me._vr_halo_linija_gore.userData.setOpacity(me._vr_halo_linija_gore.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0.19);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 230;
		el.userData.height = 2;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'vr_halo_linija_gore';
		el.userData.x = 0;
		el.userData.y = 0.19;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.060);
		el.renderOrder = 6;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._vr_halo_linija_gore.visible
			let parentEl = me._vr_halo_linija_gore.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vr_halo_linija_gore.userData.opacity = v;
			v = v * me._vr_halo_linija_gore.userData.parentOpacity;
			me._vr_halo_linija_gore.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_halo_linija_gore.children.length; i++) {
				let child = me._vr_halo_linija_gore.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vr_halo_linija_gore.userData.parentOpacity = v;
			v = v * me._vr_halo_linija_gore.userData.opacity
			me._vr_halo_linija_gore.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_halo_linija_gore.children.length; i++) {
				let child = me._vr_halo_linija_gore.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vr_halo_linija_gore = el;
		el.userData.ggId="vr_halo_linija_gore";
		me._vr_halo_linija_gore.userData.ggUpdatePosition=function (useTransition) {
		}
		me._vr_halo_traka.add(me._vr_halo_linija_gore);
		geometry = new THREE.PlaneGeometry(2.3, 0.02, 5, 5 );
		geometry.name = 'vr_halo_linija_dole_geometry';
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.788235, 0.627451, 0.305882).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'vr_halo_linija_dole_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.85098;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._vr_halo_linija_dole.material.opacity = v * me._vr_halo_linija_dole.userData.backgroundColorAlpha;
			if (me._vr_halo_linija_dole.userData.ggSubElement) {
				me._vr_halo_linija_dole.userData.ggSubElement.material.opacity = v
				me._vr_halo_linija_dole.userData.ggSubElement.visible = (v>0 && me._vr_halo_linija_dole.userData.visible);
			}
			me._vr_halo_linija_dole.visible = (v>0 && me._vr_halo_linija_dole.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._vr_halo_linija_dole.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._vr_halo_linija_dole.userData.backgroundColorAlpha = v;
			me._vr_halo_linija_dole.userData.setOpacity(me._vr_halo_linija_dole.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.19);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 230;
		el.userData.height = 2;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'vr_halo_linija_dole';
		el.userData.x = 0;
		el.userData.y = -0.19;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.070);
		el.renderOrder = 7;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._vr_halo_linija_dole.visible
			let parentEl = me._vr_halo_linija_dole.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._vr_halo_linija_dole.userData.opacity = v;
			v = v * me._vr_halo_linija_dole.userData.parentOpacity;
			me._vr_halo_linija_dole.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_halo_linija_dole.children.length; i++) {
				let child = me._vr_halo_linija_dole.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._vr_halo_linija_dole.userData.parentOpacity = v;
			v = v * me._vr_halo_linija_dole.userData.opacity
			me._vr_halo_linija_dole.userData.setOpacityInternal(v);
			for (let i = 0; i < me._vr_halo_linija_dole.children.length; i++) {
				let child = me._vr_halo_linija_dole.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._vr_halo_linija_dole = el;
		el.userData.ggId="vr_halo_linija_dole";
		me._vr_halo_linija_dole.userData.ggUpdatePosition=function (useTransition) {
		}
		me._vr_halo_traka.add(me._vr_halo_linija_dole);
		me._vr_halo.add(me._vr_halo_traka);
		me._ht_node_icon.add(me._vr_halo);
		me._ht_node.add(me._ht_node_icon);
		el = new THREE.Group();
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_node_customimage.userData.ggSubElement) {
				me._ht_node_customimage.userData.ggSubElement.material.opacity = v
				me._ht_node_customimage.userData.ggSubElement.visible = (v>0 && me._ht_node_customimage.userData.visible);
			}
			me._ht_node_customimage.visible = (v>0 && me._ht_node_customimage.userData.visible);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 50;
		el.userData.height = 50;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_node_CustomImage';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_node_customimage.visible
			let parentEl = me._ht_node_customimage.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node_customimage.userData.opacity = v;
			v = v * me._ht_node_customimage.userData.parentOpacity;
			me._ht_node_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_customimage.children.length; i++) {
				let child = me._ht_node_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node_customimage.userData.parentOpacity = v;
			v = v * me._ht_node_customimage.userData.opacity
			me._ht_node_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_customimage.children.length; i++) {
				let child = me._ht_node_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node_customimage = el;
		currentWidth = 50;
		currentHeight = 50;
		var img = {};
		img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
		img.geometry.name = 'ht_node_CustomImage_imgGeometry';
		loader = new THREE.TextureLoader();
		el.userData.ggSetUrl = function(extUrl) {
			loader.load(extUrl,
				function (texture) {
				texture.colorSpace = player.getVRTextureColorSpace();
				var loadedMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
				loadedMaterial.name = 'ht_node_CustomImage_subElementMaterial';
				me._ht_node_customimage.userData.ggSubElement.material = loadedMaterial;
				me._ht_node_customimage.userData.ggUpdatePosition();
				me._ht_node_customimage.userData.ggText = extUrl;
				me._ht_node_customimage.userData.setOpacity(me._ht_node_customimage.userData.opacity);
			});
		};
		if ((hotspot) && (hotspot.customimage)) {
			var extUrl=hotspot.customimage;
		}
		el.userData.ggSetUrl(extUrl);
		material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true } );
		material.name = 'ht_node_CustomImage_subElementMaterial';
		el.userData.ggSubElement = new THREE.Mesh( img.geometry, material );
		el.userData.ggSubElement.name = 'ht_node_CustomImage_subElement';
		el.userData.ggSubElement.position.z = el.position.z + 0.005;
		el.add(el.userData.ggSubElement);
		el.userData.clientWidth = 50;
		el.userData.clientHeight = 50;
		el.userData.ggId="ht_node_CustomImage";
		me._ht_node_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_node_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_node_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_node_customimage.ggCurrentLogicStateVisible == 0) {
			me._ht_node_customimage.visible=((!me._ht_node_customimage.material && Number(me._ht_node_customimage.userData.opacity>0)) || Number(me._ht_node_customimage.material.opacity)>0)?true:false;
			me._ht_node_customimage.userData.visible=true;
				}
				else {
			me._ht_node_customimage.visible=false;
			me._ht_node_customimage.userData.visible=false;
				}
			}
		}
		me._ht_node_customimage.logicBlock_visible();
		me._ht_node_customimage.userData.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_node_customimage.userData.clientWidth;
			var parentHeight = me._ht_node_customimage.userData.clientHeight;
			var img = me._ht_node_customimage.userData.ggSubElement;
			var imgWidth = img.material.map.image.naturalWidth;
			var imgHeight = img.material.map.image.naturalHeight;
			var aspectRatioDiv = parentWidth / parentHeight;
			var aspectRatioImg = imgWidth / imgHeight;
			if (imgWidth < parentWidth) parentWidth = imgWidth;
			if (imgHeight < parentHeight) parentHeight = imgHeight;
			var currentWidth, currentHeight;
			img.geometry.dispose();
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
			img.geometry.name = 'ht_node_CustomImage_imgGeometry';
			}
		}
		me._ht_node.add(me._ht_node_customimage);
		me._ht_node.userData.setOpacity(1.00);
		me.elementMouseOver['ht_node']=false;
		me._ht_node_icon.logicBlock_scaling();
		me._ht_node_icon.logicBlock_visible();
		me._ht_node_icon.userData.setOpacity(1.00);
		me.elementMouseOver['ht_node_icon']=false;
		me._vr_halo.logicBlock_visible();
		me._vr_halo.userData.setOpacity(1.00);
		me._vr_halo_slika.userData.setOpacity(1.00);
		me._vr_halo_traka.userData.setOpacity(1.00);
		me._vr_halo_naziv.userData.setOpacity(1.00);
		me._vr_halo_linija_gore.userData.setOpacity(1.00);
		me._vr_halo_linija_dole.userData.setOpacity(1.00);
		me._ht_node_customimage.logicBlock_visible();
		me._ht_node_customimage.userData.setOpacity(1.00);
			me.ggEvent_activehotspotchanged=function() {
				me._ht_node_icon.logicBlock_visible();
				me._vr_halo.logicBlock_visible();
				me._ht_node_customimage.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._ht_node_icon.logicBlock_visible();
				me._vr_halo.logicBlock_visible();
					me._vr_halo_naziv.userData.ggUpdateText();
				me._ht_node_customimage.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._ht_node_icon.logicBlock_visible();
				me._vr_halo.logicBlock_visible();
				me._ht_node_customimage.logicBlock_visible();
			};
			me.__obj = me._ht_node;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	function SkinHotspotClass_ht_image(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_image';
		el.userData.x = -2;
		el.userData.y = 1;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image.visible
			let parentEl = me._ht_image.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image.userData.opacity = v;
			v = v * me._ht_image.userData.parentOpacity;
			me._ht_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image.children.length; i++) {
				let child = me._ht_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image.userData.parentOpacity = v;
			v = v * me._ht_image.userData.opacity
			me._ht_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image.children.length; i++) {
				let child = me._ht_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image = el;
		el.userData.ggId="ht_image";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_image.userData.onclick=function (e) {
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_image.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_image.userData.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_image']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_image.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_image']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
			player.setActiveHotspot(null);
		}
		me._ht_image.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'ht_image_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_image_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(-0.01);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_icon';
		el.userData.x = 0;
		el.userData.y = -0.01;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_image_icon.material) me._ht_image_icon.material.opacity = v;
			me._ht_image_icon.visible = (v>0 && me._ht_image_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_image_icon.visible
			let parentEl = me._ht_image_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_icon.userData.opacity = v;
			v = v * me._ht_image_icon.userData.parentOpacity;
			me._ht_image_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_icon.children.length; i++) {
				let child = me._ht_image_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_icon.userData.parentOpacity = v;
			v = v * me._ht_image_icon.userData.opacity
			me._ht_image_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_icon.children.length; i++) {
				let child = me._ht_image_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_icon = el;
		el.userData.ggId="ht_image_icon";
		me._ht_image_icon.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_image_icon'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_image_icon.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_image_icon.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_image_icon.ggCurrentLogicStateScaling == 0) {
					me._ht_image_icon.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._ht_image_icon.userData.transitions.length; i++) {
						if (me._ht_image_icon.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_icon.userData.transitions[i].interval);
							me._ht_image_icon.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_image_icon.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_icon.scale.set(transition_scale.startScale.x + (me._ht_image_icon.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_icon.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_icon.position.x = (me._ht_image_icon.position.x - me._ht_image_icon.userData.curScaleOffX) + scaleOffX;
						me._ht_image_icon.userData.curScaleOffX = scaleOffX;
						me._ht_image_icon.position.y = (me._ht_image_icon.position.y - me._ht_image_icon.userData.curScaleOffY) + scaleOffY;
						me._ht_image_icon.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_icon.userData.transitions.splice(me._ht_image_icon.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_icon.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_image_icon.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_image_icon.userData.transitions.length; i++) {
						if (me._ht_image_icon.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_icon.userData.transitions[i].interval);
							me._ht_image_icon.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_image_icon.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_icon.scale.set(transition_scale.startScale.x + (me._ht_image_icon.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_icon.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_icon.position.x = (me._ht_image_icon.position.x - me._ht_image_icon.userData.curScaleOffX) + scaleOffX;
						me._ht_image_icon.userData.curScaleOffX = scaleOffX;
						me._ht_image_icon.position.y = (me._ht_image_icon.position.y - me._ht_image_icon.userData.curScaleOffY) + scaleOffY;
						me._ht_image_icon.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_icon.userData.transitions.splice(me._ht_image_icon.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_icon.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_image_icon.logicBlock_scaling();
		me._ht_image_icon.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_image_hotspots') == "true")) || 
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_image_icon.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_image_icon.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_image_icon.ggCurrentLogicStateVisible == 0) {
			me._ht_image_icon.visible=false;
			me._ht_image_icon.userData.visible=false;
				}
				else {
			me._ht_image_icon.visible=((!me._ht_image_icon.material && Number(me._ht_image_icon.userData.opacity>0)) || Number(me._ht_image_icon.material.opacity)>0)?true:false;
			me._ht_image_icon.userData.visible=true;
				}
			}
		}
		me._ht_image_icon.logicBlock_visible();
		me._ht_image_icon.userData.onclick=function (e) {
			player.setVariableValue('vis_image_hotspots', player.getVariableValue('vis_image_hotspots') + "<"+me.hotspot.id+">");
		}
		me._ht_image_icon.userData.onmouseenter=function (e) {
			me.elementMouseOver['ht_image_icon']=true;
			me._ht_image_tooltip.logicBlock_visible();
			me._ht_image_icon.logicBlock_scaling();
		}
		me._ht_image_icon.userData.ontouchend=function (e) {
			me._ht_image_icon.logicBlock_scaling();
		}
		me._ht_image_icon.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_image_icon']=false;
			me._ht_image_tooltip.logicBlock_visible();
			me._ht_image_icon.logicBlock_scaling();
		}
		me._ht_image_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(1, 0.22, 5, 5 );
		geometry.name = 'ht_image_tooltip_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_image_tooltip_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.85098;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_image_tooltip.material.opacity = v;
			if (me._ht_image_tooltip.userData.hasScrollbar) {
				me._ht_image_tooltip.userData.scrollbar.material.opacity = v;
				me._ht_image_tooltip.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_image_tooltip.userData.ggSubElement) {
				me._ht_image_tooltip.userData.ggSubElement.material.opacity = v
				me._ht_image_tooltip.userData.ggSubElement.visible = (v>0 && me._ht_image_tooltip.userData.visible);
			}
			me._ht_image_tooltip.visible = (v>0 && me._ht_image_tooltip.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_image_tooltip.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_image_tooltip.userData.backgroundColorAlpha = v;
			me._ht_image_tooltip.userData.setOpacity(me._ht_image_tooltip.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.365);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 100;
		el.userData.height = 22;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_tooltip';
		el.userData.x = 0;
		el.userData.y = -0.365;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image_tooltip.visible
			let parentEl = me._ht_image_tooltip.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_tooltip.userData.opacity = v;
			v = v * me._ht_image_tooltip.userData.parentOpacity;
			me._ht_image_tooltip.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_tooltip.children.length; i++) {
				let child = me._ht_image_tooltip.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_tooltip.userData.parentOpacity = v;
			v = v * me._ht_image_tooltip.userData.opacity
			me._ht_image_tooltip.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_tooltip.children.length; i++) {
				let child = me._ht_image_tooltip.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_tooltip = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(0.0862745, 0.0784314, 0.0666667).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0.945098, 0.901961, 0.811765).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 200;
		canvas.height = 44;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_image_tooltip.userData.totalHeightCanv = 2 * (13);
			me._ht_image_tooltip.userData.textLines = [];
			var ctx = me._ht_image_tooltip.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_image_tooltip.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_image_tooltip.userData.textLines.push(line);
					line = '';
					me._ht_image_tooltip.userData.totalHeightCanv += me._ht_image_tooltip.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._ht_image_tooltip.userData.width - 10 - (scrollbar ? 25 : 0))) && i > 0) {
					me._ht_image_tooltip.userData.textLines.push(line);
					line = words[i];
					me._ht_image_tooltip.userData.totalHeightCanv += me._ht_image_tooltip.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._ht_image_tooltip.userData.textLines.push(line);
			me._ht_image_tooltip.userData.totalHeightCanv += me._ht_image_tooltip.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_image_tooltip.userData.textCanvas;
			var ctx = me._ht_image_tooltip.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_image_tooltip.userData.backgroundColor.r * 255 + ', ' + me._ht_image_tooltip.userData.backgroundColor.g * 255 + ', ' + me._ht_image_tooltip.userData.backgroundColor.b * 255 + ', ' + me._ht_image_tooltip.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_image_tooltip.userData.textColor.r * 255 + ', ' + me._ht_image_tooltip.userData.textColor.g * 255 + ', ' + me._ht_image_tooltip.userData.textColor.b * 255 + ', ' + me._ht_image_tooltip.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_image_tooltip.userData.boxWidthCanv - (me._ht_image_tooltip.userData.hasScrollbar ? 50 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 2 * 8;
			for (var i = 0; i < me._ht_image_tooltip.userData.textLines.length; i++) {
				ctx.fillText(me._ht_image_tooltip.userData.textLines[i], x, y);
				y += me._ht_image_tooltip.userData.lineHeightCanv;
			}
			geometry = new THREE.PlaneGeometry(me._ht_image_tooltip.userData.boxWidthCanv / 200.0, me._ht_image_tooltip.userData.boxHeightCanv / 200.0, 5, 5 );
			geometry.name = 'ht_image_tooltip_geometry';
			me._ht_image_tooltip.geometry.dispose();
			me._ht_image_tooltip.geometry = geometry;
			var diffY = (me._ht_image_tooltip.userData.boxHeightCanv / 2) - me._ht_image_tooltip.userData.height;
			me._ht_image_tooltip.position.y = me._ht_image_tooltip.userData.y - ((diffY / 2.0) / 100.0);
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_image_tooltip_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_image_tooltip.material.map) {
				me._ht_image_tooltip.material.map.dispose();
			}
			me._ht_image_tooltip.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._ht_image_tooltip.children.length; i++) {
				let child = me._ht_image_tooltip.children[i];
				if (child.name.includes('scrollbar')) me._ht_image_tooltip.remove(child);
			}
			var canv = me._ht_image_tooltip.userData.textCanvas;
			var ctx = me._ht_image_tooltip.userData.textCanvasContext;
			ctx.font = '36px Verdana';
			me._ht_image_tooltip.userData.lineHeightCanv = 36 * 1.2;
			me._ht_image_tooltip.userData.textLines = [];
			me._ht_image_tooltip.userData.textLines.push(me._ht_image_tooltip.userData.ggText);
			me._ht_image_tooltip.userData.totalHeightCanv = 2 * (13);
			me._ht_image_tooltip.userData.totalHeightCanv += me._ht_image_tooltip.userData.lineHeightCanv;
			me._ht_image_tooltip.userData.boxWidthCanv = ctx.measureText(me._ht_image_tooltip.userData.ggText).width + (2 * 10);
			me._ht_image_tooltip.userData.boxHeightCanv = me._ht_image_tooltip.userData.totalHeightCanv;
			canv.width = me._ht_image_tooltip.userData.boxWidthCanv;
			canv.height = me._ht_image_tooltip.userData.boxHeightCanv;
			ctx.font = '36px Verdana';
			me._ht_image_tooltip.userData.ggPaintCanvasText();
		}
		me._ht_image_tooltip.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_image_tooltip.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_image_tooltip.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_image_tooltip.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_image_tooltip.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_image_tooltip.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_image_tooltip.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_image_tooltip";
		me._ht_image_tooltip.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_image_icon'] == true)) && 
				((player._(me.hotspot.title) != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_image_tooltip.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_image_tooltip.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_image_tooltip.ggCurrentLogicStateVisible == 0) {
			me._ht_image_tooltip.visible=((!me._ht_image_tooltip.material && Number(me._ht_image_tooltip.userData.opacity>0)) || Number(me._ht_image_tooltip.material.opacity)>0)?true:false;
			me._ht_image_tooltip.userData.visible=true;
				}
				else {
			me._ht_image_tooltip.visible=false;
			me._ht_image_tooltip.userData.visible=false;
				}
			}
		}
		me._ht_image_tooltip.logicBlock_visible();
		me._ht_image_tooltip.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_image_icon.add(me._ht_image_tooltip);
		me._ht_image.add(me._ht_image_icon);
		geometry = new THREE.PlaneGeometry(3.6, 3.6, 5, 5 );
		geometry.name = 'ht_image_bg_geometry';
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.0862745, 0.0784314, 0.0666667).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_image_bg_material';
		el = new THREE.Mesh( geometry, material );
		width = 3.6;
		height = 3.6;
		borderShape = new THREE.Shape();
		borderShape.moveTo((-width / 2.0) - 0.02 + 0, (height / 2.0) + 0.02);
		borderShape.lineTo((width / 2.0) + 0.02 - 0, (height / 2.0) + 0.02);
		borderShape.lineTo((width / 2.0) + 0.02, (-height / 2.0) - 0.02 + 0);
		borderShape.lineTo((-width / 2.0) - 0.02 + 0, (-height / 2.0) - 0.02);
		borderShape.lineTo((-width / 2.0) - 0.02, (height / 2.0) + 0.02 - 0);
		innerShape = new THREE.Path();
		innerShape.moveTo((-width / 2.0), (height / 2.0));
		innerShape.lineTo((width / 2.0), (height / 2.0));
		innerShape.lineTo((width / 2.0), (-height / 2.0));
		innerShape.lineTo((-width / 2.0), (-height / 2.0));
		borderShape.holes.push(innerShape);
		borderGeometry = new THREE.ShapeGeometry(borderShape);
		borderGeometry.name = 'ht_image_bg_borderGeometry';
		borderMaterial = new THREE.MeshBasicMaterial( {color: new THREE.Color(0.788235, 0.627451, 0.305882).convertSRGBToLinear(), side: THREE.DoubleSide, transparent: true } );
		borderMaterial.name = 'ht_image_bg_borderMaterial';
		el.userData.border = new THREE.Mesh( borderGeometry, borderMaterial );
		el.userData.border.name = 'ht_image_bg_borderMesh';
		el.add(el.userData.border);
		el.userData.backgroundColorAlpha = 0.85098;
		el.userData.borderColorAlpha = 0.85098;
		el.userData.setOpacityInternal = function(v) {
			me._ht_image_bg.material.opacity = v * me._ht_image_bg.userData.backgroundColorAlpha;
			me._ht_image_bg.userData.border.material.opacity = v * me._ht_image_bg.userData.borderColorAlpha;
			if (me._ht_image_bg.userData.ggSubElement) {
				me._ht_image_bg.userData.ggSubElement.material.opacity = v
				me._ht_image_bg.userData.ggSubElement.visible = (v>0 && me._ht_image_bg.userData.visible);
			}
			me._ht_image_bg.visible = (v>0 && me._ht_image_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_image_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_image_bg.userData.backgroundColorAlpha = v;
			me._ht_image_bg.userData.setOpacity(me._ht_image_bg.userData.opacity);
		}
		el.userData.setBorderColor = function(v) {
			me._ht_image_bg.userData.border.material.color = v;
		}
		el.userData.setBorderColorAlpha = function(v) {
			me._ht_image_bg.userData.borderColorAlpha = v;
			me._ht_image_bg.userData.setOpacity(me._ht_image_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(1.782);
		el.scale.set(1.00, 0.01, 1.0);
		el.userData.width = 360;
		el.userData.height = 360;
		el.userData.scale = {x: 1.00, y: 0.01, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 1.782;
		el.name = 'ht_image_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image_bg.visible
			let parentEl = me._ht_image_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_bg.userData.opacity = v;
			v = v * me._ht_image_bg.userData.parentOpacity;
			me._ht_image_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_bg.children.length; i++) {
				let child = me._ht_image_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_bg.userData.parentOpacity = v;
			v = v * me._ht_image_bg.userData.opacity
			me._ht_image_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_bg.children.length; i++) {
				let child = me._ht_image_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_bg = el;
		el.userData.ggId="ht_image_bg";
		me._ht_image_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				(((player.getVariableValue('vis_image_hotspots') !== null) && (player.getVariableValue('vis_image_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_image_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_image_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_image_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_image_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_image_bg.userData.transitions.length; i++) {
						if (me._ht_image_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_bg.userData.transitions[i].interval);
							me._ht_image_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_image_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_bg.scale.set(transition_scale.startScale.x + (me._ht_image_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_bg.position.x = (me._ht_image_bg.position.x - me._ht_image_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_image_bg.userData.curScaleOffX = scaleOffX;
						me._ht_image_bg.position.y = (me._ht_image_bg.position.y - me._ht_image_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_image_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_bg.userData.transitions.splice(me._ht_image_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_image_bg.userData.transitionValue_scale = {x: 1, y: 0.01, z: 1.0};
					for (var i = 0; i < me._ht_image_bg.userData.transitions.length; i++) {
						if (me._ht_image_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_bg.userData.transitions[i].interval);
							me._ht_image_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_image_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_bg.scale.set(transition_scale.startScale.x + (me._ht_image_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_bg.position.x = (me._ht_image_bg.position.x - me._ht_image_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_image_bg.userData.curScaleOffX = scaleOffX;
						me._ht_image_bg.position.y = (me._ht_image_bg.position.y - me._ht_image_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_image_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_bg.userData.transitions.splice(me._ht_image_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_image_bg.logicBlock_scaling();
		me._ht_image_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('vis_image_hotspots') !== null) && (player.getVariableValue('vis_image_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_image_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_image_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_image_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_image_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_image_bg.userData.transitions.length; i++) {
						if (me._ht_image_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_bg.userData.transitions[i].interval);
							me._ht_image_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_bg.material ? me._ht_image_bg.material.opacity : me._ht_image_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_bg.userData.transitions.splice(me._ht_image_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_image_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_image_bg.userData.transitions.length; i++) {
						if (me._ht_image_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_bg.userData.transitions[i].interval);
							me._ht_image_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_bg.material ? me._ht_image_bg.material.opacity : me._ht_image_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_bg.userData.transitions.splice(me._ht_image_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_image_bg.logicBlock_alpha();
		me._ht_image_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		el = new THREE.Group();
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_image_img.userData.ggSubElement) {
				me._ht_image_img.userData.ggSubElement.material.opacity = v
				me._ht_image_img.userData.ggSubElement.visible = (v>0 && me._ht_image_img.userData.visible);
			}
			me._ht_image_img.visible = (v>0 && me._ht_image_img.userData.visible);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 340;
		el.userData.height = 340;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_img';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image_img.visible
			let parentEl = me._ht_image_img.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_img.userData.opacity = v;
			v = v * me._ht_image_img.userData.parentOpacity;
			me._ht_image_img.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_img.children.length; i++) {
				let child = me._ht_image_img.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_img.userData.parentOpacity = v;
			v = v * me._ht_image_img.userData.opacity
			me._ht_image_img.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_img.children.length; i++) {
				let child = me._ht_image_img.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_img = el;
		currentWidth = 340;
		currentHeight = 340;
		var img = {};
		img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
		img.geometry.name = 'ht_image_img_imgGeometry';
		loader = new THREE.TextureLoader();
		el.userData.ggSetUrl = function(extUrl) {
			loader.load(extUrl,
				function (texture) {
				texture.colorSpace = player.getVRTextureColorSpace();
				var loadedMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
				loadedMaterial.name = 'ht_image_img_subElementMaterial';
				me._ht_image_img.userData.ggSubElement.material = loadedMaterial;
				me._ht_image_img.userData.ggUpdatePosition();
				me._ht_image_img.userData.ggText = extUrl;
				me._ht_image_img.userData.setOpacity(me._ht_image_img.userData.opacity);
			});
		};
		player.addListener('changenode', function() {
		});
		var extUrl=basePath + ""+player._(me.hotspot.url)+"";
		el.userData.ggSetUrl(extUrl);
		material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true } );
		material.name = 'ht_image_img_subElementMaterial';
		el.userData.ggSubElement = new THREE.Mesh( img.geometry, material );
		el.userData.ggSubElement.name = 'ht_image_img_subElement';
		el.userData.ggSubElement.position.z = el.position.z + 0.005;
		el.add(el.userData.ggSubElement);
		el.userData.clientWidth = 340;
		el.userData.clientHeight = 340;
		el.userData.ggId="ht_image_img";
		me._ht_image_img.userData.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_image_img.userData.clientWidth;
			var parentHeight = me._ht_image_img.userData.clientHeight;
			var img = me._ht_image_img.userData.ggSubElement;
			var imgWidth = img.material.map.image.naturalWidth;
			var imgHeight = img.material.map.image.naturalHeight;
			var aspectRatioDiv = parentWidth / parentHeight;
			var aspectRatioImg = imgWidth / imgHeight;
			if (imgWidth < parentWidth) parentWidth = imgWidth;
			if (imgHeight < parentHeight) parentHeight = imgHeight;
			var currentWidth, currentHeight;
			img.geometry.dispose();
			if (aspectRatioDiv > aspectRatioImg) {
				currentHeight = parentHeight;
				currentWidth = parentHeight * aspectRatioImg;
			img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
			img.geometry.name = 'ht_image_img_imgGeometry';
			} else {
				currentWidth = parentWidth;
				currentHeight = parentWidth / aspectRatioImg;
			img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
			img.geometry.name = 'ht_image_img_imgGeometry';
			};
		}
		me._ht_image_bg.add(me._ht_image_img);
		me._ht_image.add(me._ht_image_bg);
		geometry = new THREE.PlaneGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'ht_image_close_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_image_close_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(2.1);
		el.translateY(1.575);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_close';
		el.userData.x = 2.1;
		el.userData.y = 1.575;
		el.userData.hanchor = 1;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_image_close.material) me._ht_image_close.material.opacity = v;
			me._ht_image_close.visible = (v>0 && me._ht_image_close.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_image_close.visible
			let parentEl = me._ht_image_close.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_close.userData.opacity = v;
			v = v * me._ht_image_close.userData.parentOpacity;
			me._ht_image_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_close.children.length; i++) {
				let child = me._ht_image_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_close.userData.parentOpacity = v;
			v = v * me._ht_image_close.userData.opacity
			me._ht_image_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_close.children.length; i++) {
				let child = me._ht_image_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_close = el;
		el.userData.ggId="ht_image_close";
		me._ht_image_close.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_image_close'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_image_close.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_image_close.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_image_close.ggCurrentLogicStateScaling == 0) {
					me._ht_image_close.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._ht_image_close.userData.transitions.length; i++) {
						if (me._ht_image_close.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_close.userData.transitions[i].interval);
							me._ht_image_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_image_close.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_close.scale.set(transition_scale.startScale.x + (me._ht_image_close.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_close.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_close.position.x = (me._ht_image_close.position.x - me._ht_image_close.userData.curScaleOffX) + scaleOffX;
						me._ht_image_close.userData.curScaleOffX = scaleOffX;
						me._ht_image_close.position.y = (me._ht_image_close.position.y - me._ht_image_close.userData.curScaleOffY) + scaleOffY;
						me._ht_image_close.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_close.userData.transitions.splice(me._ht_image_close.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_close.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_image_close.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_image_close.userData.transitions.length; i++) {
						if (me._ht_image_close.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_close.userData.transitions[i].interval);
							me._ht_image_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_image_close.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_close.scale.set(transition_scale.startScale.x + (me._ht_image_close.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_close.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_close.position.x = (me._ht_image_close.position.x - me._ht_image_close.userData.curScaleOffX) + scaleOffX;
						me._ht_image_close.userData.curScaleOffX = scaleOffX;
						me._ht_image_close.position.y = (me._ht_image_close.position.y - me._ht_image_close.userData.curScaleOffY) + scaleOffY;
						me._ht_image_close.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_close.userData.transitions.splice(me._ht_image_close.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_close.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_image_close.logicBlock_scaling();
		me._ht_image_close.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('vis_image_hotspots') !== null) && (player.getVariableValue('vis_image_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_image_close.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_image_close.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_image_close.ggCurrentLogicStateAlpha == 0) {
					me._ht_image_close.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_image_close.userData.transitions.length; i++) {
						if (me._ht_image_close.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_close.userData.transitions[i].interval);
							me._ht_image_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_close.material ? me._ht_image_close.material.opacity : me._ht_image_close.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_close.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_close.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_close.userData.transitions.splice(me._ht_image_close.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_close.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_image_close.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_image_close.userData.transitions.length; i++) {
						if (me._ht_image_close.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_close.userData.transitions[i].interval);
							me._ht_image_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_close.material ? me._ht_image_close.material.opacity : me._ht_image_close.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_close.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_close.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_close.userData.transitions.splice(me._ht_image_close.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_close.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_image_close.logicBlock_alpha();
		me._ht_image_close.userData.onclick=function (e) {
			player.setVariableValue('vis_image_hotspots', player.getVariableValue('vis_image_hotspots').replace("<"+me.hotspot.id+">", ''));
		}
		me._ht_image_close.userData.onmouseenter=function (e) {
			me.elementMouseOver['ht_image_close']=true;
			me._ht_image_close.logicBlock_scaling();
		}
		me._ht_image_close.userData.ontouchend=function (e) {
			me._ht_image_close.logicBlock_scaling();
		}
		me._ht_image_close.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_image_close']=false;
			me._ht_image_close.logicBlock_scaling();
		}
		me._ht_image_close.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_image.add(me._ht_image_close);
		el = new THREE.Group();
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_image_customimage.userData.ggSubElement) {
				me._ht_image_customimage.userData.ggSubElement.material.opacity = v
				me._ht_image_customimage.userData.ggSubElement.visible = (v>0 && me._ht_image_customimage.userData.visible);
			}
			me._ht_image_customimage.visible = (v>0 && me._ht_image_customimage.userData.visible);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 50;
		el.userData.height = 50;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_CustomImage';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image_customimage.visible
			let parentEl = me._ht_image_customimage.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_customimage.userData.opacity = v;
			v = v * me._ht_image_customimage.userData.parentOpacity;
			me._ht_image_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_customimage.children.length; i++) {
				let child = me._ht_image_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_customimage.userData.parentOpacity = v;
			v = v * me._ht_image_customimage.userData.opacity
			me._ht_image_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_customimage.children.length; i++) {
				let child = me._ht_image_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_customimage = el;
		currentWidth = 50;
		currentHeight = 50;
		var img = {};
		img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
		img.geometry.name = 'ht_image_CustomImage_imgGeometry';
		loader = new THREE.TextureLoader();
		el.userData.ggSetUrl = function(extUrl) {
			loader.load(extUrl,
				function (texture) {
				texture.colorSpace = player.getVRTextureColorSpace();
				var loadedMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
				loadedMaterial.name = 'ht_image_CustomImage_subElementMaterial';
				me._ht_image_customimage.userData.ggSubElement.material = loadedMaterial;
				me._ht_image_customimage.userData.ggUpdatePosition();
				me._ht_image_customimage.userData.ggText = extUrl;
				me._ht_image_customimage.userData.setOpacity(me._ht_image_customimage.userData.opacity);
			});
		};
		if ((hotspot) && (hotspot.customimage)) {
			var extUrl=hotspot.customimage;
		}
		el.userData.ggSetUrl(extUrl);
		material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true } );
		material.name = 'ht_image_CustomImage_subElementMaterial';
		el.userData.ggSubElement = new THREE.Mesh( img.geometry, material );
		el.userData.ggSubElement.name = 'ht_image_CustomImage_subElement';
		el.userData.ggSubElement.position.z = el.position.z + 0.005;
		el.add(el.userData.ggSubElement);
		el.userData.clientWidth = 50;
		el.userData.clientHeight = 50;
		el.userData.ggId="ht_image_CustomImage";
		me._ht_image_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(((player.getVariableValue('vis_image_hotspots') !== null) && (player.getVariableValue('vis_image_hotspots')).indexOf("<"+me.hotspot.id+">") == -1)) && 
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_image_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_image_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_image_customimage.ggCurrentLogicStateVisible == 0) {
			me._ht_image_customimage.visible=((!me._ht_image_customimage.material && Number(me._ht_image_customimage.userData.opacity>0)) || Number(me._ht_image_customimage.material.opacity)>0)?true:false;
			me._ht_image_customimage.userData.visible=true;
				}
				else {
			me._ht_image_customimage.visible=false;
			me._ht_image_customimage.userData.visible=false;
				}
			}
		}
		me._ht_image_customimage.logicBlock_visible();
		me._ht_image_customimage.userData.onclick=function (e) {
			player.setVariableValue('vis_image_hotspots', player.getVariableValue('vis_image_hotspots') + "<"+me.hotspot.id+">");
		}
		me._ht_image_customimage.userData.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_image_customimage.userData.clientWidth;
			var parentHeight = me._ht_image_customimage.userData.clientHeight;
			var img = me._ht_image_customimage.userData.ggSubElement;
			var imgWidth = img.material.map.image.naturalWidth;
			var imgHeight = img.material.map.image.naturalHeight;
			var aspectRatioDiv = parentWidth / parentHeight;
			var aspectRatioImg = imgWidth / imgHeight;
			if (imgWidth < parentWidth) parentWidth = imgWidth;
			if (imgHeight < parentHeight) parentHeight = imgHeight;
			var currentWidth, currentHeight;
			img.geometry.dispose();
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
			img.geometry.name = 'ht_image_CustomImage_imgGeometry';
			}
		}
		me._ht_image.add(me._ht_image_customimage);
		me._ht_image.userData.setOpacity(1.00);
		me.elementMouseOver['ht_image']=false;
		me._ht_image_icon.logicBlock_scaling();
		me._ht_image_icon.logicBlock_visible();
		me._ht_image_icon.userData.setOpacity(1.00);
		me.elementMouseOver['ht_image_icon']=false;
		me._ht_image_tooltip.logicBlock_visible();
		me._ht_image_tooltip.userData.setOpacity(1.00);
		me._ht_image_bg.logicBlock_scaling();
		me._ht_image_bg.logicBlock_alpha();
		me._ht_image_bg.userData.setOpacity(0.00);
		me._ht_image_img.userData.setOpacity(1.00);
		me._ht_image_close.logicBlock_scaling();
		me._ht_image_close.logicBlock_alpha();
		me._ht_image_close.userData.setOpacity(0.00);
		me.elementMouseOver['ht_image_close']=false;
		me._ht_image_customimage.logicBlock_visible();
		me._ht_image_customimage.userData.setOpacity(1.00);
			me.ggEvent_activehotspotchanged=function() {
				me._ht_image_icon.logicBlock_visible();
				me._ht_image_tooltip.logicBlock_visible();
				me._ht_image_customimage.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._ht_image_icon.logicBlock_visible();
					me._ht_image_tooltip.userData.ggUpdateText();
				me._ht_image_tooltip.logicBlock_visible();
				me._ht_image_bg.logicBlock_scaling();
				me._ht_image_bg.logicBlock_alpha();
				me._ht_image_close.logicBlock_alpha();
				me._ht_image_customimage.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._ht_image_icon.logicBlock_visible();
				me._ht_image_tooltip.logicBlock_visible();
				me._ht_image_bg.logicBlock_scaling();
				me._ht_image_bg.logicBlock_alpha();
				me._ht_image_close.logicBlock_alpha();
				me._ht_image_customimage.logicBlock_visible();
			};
			me.ggEvent_varchanged_vis_image_hotspots=function() {
				me._ht_image_icon.logicBlock_visible();
				me._ht_image_bg.logicBlock_scaling();
				me._ht_image_bg.logicBlock_alpha();
				me._ht_image_close.logicBlock_alpha();
				me._ht_image_customimage.logicBlock_visible();
			};
			me.__obj = me._ht_image;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	function SkinHotspotClass_ht_info(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_info';
		el.userData.x = -2;
		el.userData.y = 1;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info.visible
			let parentEl = me._ht_info.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info.userData.opacity = v;
			v = v * me._ht_info.userData.parentOpacity;
			me._ht_info.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info.children.length; i++) {
				let child = me._ht_info.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info.userData.parentOpacity = v;
			v = v * me._ht_info.userData.opacity
			me._ht_info.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info.children.length; i++) {
				let child = me._ht_info.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info = el;
		el.userData.ggId="ht_info";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_info.userData.onclick=function (e) {
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_info.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_info.userData.onmouseenter=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_info']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_info.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_info']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
			player.setActiveHotspot(null);
		}
		me._ht_info.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'ht_info_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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'+
	'MEOe/wP9355FTi4gjAAAAABJRU5ErkJggg==');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_info_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_info_icon.material) me._ht_info_icon.material.opacity = v;
			me._ht_info_icon.visible = (v>0 && me._ht_info_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_info_icon.visible
			let parentEl = me._ht_info_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_icon.userData.opacity = v;
			v = v * me._ht_info_icon.userData.parentOpacity;
			me._ht_info_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_icon.children.length; i++) {
				let child = me._ht_info_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_icon.userData.parentOpacity = v;
			v = v * me._ht_info_icon.userData.opacity
			me._ht_info_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_icon.children.length; i++) {
				let child = me._ht_info_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_icon = el;
		el.userData.ggId="ht_info_icon";
		me._ht_info_icon.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_info_icon'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_info_icon.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_info_icon.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_info_icon.ggCurrentLogicStateScaling == 0) {
					me._ht_info_icon.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._ht_info_icon.userData.transitions.length; i++) {
						if (me._ht_info_icon.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_icon.userData.transitions[i].interval);
							me._ht_info_icon.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_info_icon.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_icon.scale.set(transition_scale.startScale.x + (me._ht_info_icon.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_icon.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_icon.position.x = (me._ht_info_icon.position.x - me._ht_info_icon.userData.curScaleOffX) + scaleOffX;
						me._ht_info_icon.userData.curScaleOffX = scaleOffX;
						me._ht_info_icon.position.y = (me._ht_info_icon.position.y - me._ht_info_icon.userData.curScaleOffY) + scaleOffY;
						me._ht_info_icon.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_icon.userData.transitions.splice(me._ht_info_icon.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_icon.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_info_icon.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_info_icon.userData.transitions.length; i++) {
						if (me._ht_info_icon.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_icon.userData.transitions[i].interval);
							me._ht_info_icon.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_info_icon.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_icon.scale.set(transition_scale.startScale.x + (me._ht_info_icon.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_icon.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_icon.position.x = (me._ht_info_icon.position.x - me._ht_info_icon.userData.curScaleOffX) + scaleOffX;
						me._ht_info_icon.userData.curScaleOffX = scaleOffX;
						me._ht_info_icon.position.y = (me._ht_info_icon.position.y - me._ht_info_icon.userData.curScaleOffY) + scaleOffY;
						me._ht_info_icon.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_icon.userData.transitions.splice(me._ht_info_icon.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_icon.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_info_icon.logicBlock_scaling();
		me._ht_info_icon.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(((player.getVariableValue('vis_info_hotspots') !== null) && (player.getVariableValue('vis_info_hotspots')).indexOf("<"+me.hotspot.id+">") != -1)) || 
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_info_icon.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_info_icon.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_info_icon.ggCurrentLogicStateVisible == 0) {
			me._ht_info_icon.visible=false;
			me._ht_info_icon.userData.visible=false;
				}
				else {
			me._ht_info_icon.visible=((!me._ht_info_icon.material && Number(me._ht_info_icon.userData.opacity>0)) || Number(me._ht_info_icon.material.opacity)>0)?true:false;
			me._ht_info_icon.userData.visible=true;
				}
			}
		}
		me._ht_info_icon.logicBlock_visible();
		me._ht_info_icon.userData.onclick=function (e) {
			player.setVariableValue('vis_info_hotspots', player.getVariableValue('vis_info_hotspots') + "<"+me.hotspot.id+">");
		}
		me._ht_info_icon.userData.onmouseenter=function (e) {
			me.elementMouseOver['ht_info_icon']=true;
			me._ht_info_tooltip.logicBlock_visible();
			me._ht_info_icon.logicBlock_scaling();
		}
		me._ht_info_icon.userData.ontouchend=function (e) {
			me._ht_info_icon.logicBlock_scaling();
		}
		me._ht_info_icon.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_info_icon']=false;
			me._ht_info_tooltip.logicBlock_visible();
			me._ht_info_icon.logicBlock_scaling();
		}
		me._ht_info_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(1, 0.22, 5, 5 );
		geometry.name = 'ht_info_tooltip_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_info_tooltip_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.85098;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_info_tooltip.material.opacity = v;
			if (me._ht_info_tooltip.userData.hasScrollbar) {
				me._ht_info_tooltip.userData.scrollbar.material.opacity = v;
				me._ht_info_tooltip.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_info_tooltip.userData.ggSubElement) {
				me._ht_info_tooltip.userData.ggSubElement.material.opacity = v
				me._ht_info_tooltip.userData.ggSubElement.visible = (v>0 && me._ht_info_tooltip.userData.visible);
			}
			me._ht_info_tooltip.visible = (v>0 && me._ht_info_tooltip.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_tooltip.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_tooltip.userData.backgroundColorAlpha = v;
			me._ht_info_tooltip.userData.setOpacity(me._ht_info_tooltip.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.365);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 100;
		el.userData.height = 22;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_tooltip';
		el.userData.x = 0;
		el.userData.y = -0.365;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info_tooltip.visible
			let parentEl = me._ht_info_tooltip.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_tooltip.userData.opacity = v;
			v = v * me._ht_info_tooltip.userData.parentOpacity;
			me._ht_info_tooltip.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_tooltip.children.length; i++) {
				let child = me._ht_info_tooltip.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_tooltip.userData.parentOpacity = v;
			v = v * me._ht_info_tooltip.userData.opacity
			me._ht_info_tooltip.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_tooltip.children.length; i++) {
				let child = me._ht_info_tooltip.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_tooltip = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(0.0862745, 0.0784314, 0.0666667).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0.945098, 0.901961, 0.811765).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 200;
		canvas.height = 44;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_info_tooltip.userData.totalHeightCanv = 2 * (13);
			me._ht_info_tooltip.userData.textLines = [];
			var ctx = me._ht_info_tooltip.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_info_tooltip.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_info_tooltip.userData.textLines.push(line);
					line = '';
					me._ht_info_tooltip.userData.totalHeightCanv += me._ht_info_tooltip.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._ht_info_tooltip.userData.width - 10 - (scrollbar ? 25 : 0))) && i > 0) {
					me._ht_info_tooltip.userData.textLines.push(line);
					line = words[i];
					me._ht_info_tooltip.userData.totalHeightCanv += me._ht_info_tooltip.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._ht_info_tooltip.userData.textLines.push(line);
			me._ht_info_tooltip.userData.totalHeightCanv += me._ht_info_tooltip.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_info_tooltip.userData.textCanvas;
			var ctx = me._ht_info_tooltip.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_info_tooltip.userData.backgroundColor.r * 255 + ', ' + me._ht_info_tooltip.userData.backgroundColor.g * 255 + ', ' + me._ht_info_tooltip.userData.backgroundColor.b * 255 + ', ' + me._ht_info_tooltip.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_info_tooltip.userData.textColor.r * 255 + ', ' + me._ht_info_tooltip.userData.textColor.g * 255 + ', ' + me._ht_info_tooltip.userData.textColor.b * 255 + ', ' + me._ht_info_tooltip.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_info_tooltip.userData.boxWidthCanv - (me._ht_info_tooltip.userData.hasScrollbar ? 50 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 2 * 8;
			for (var i = 0; i < me._ht_info_tooltip.userData.textLines.length; i++) {
				ctx.fillText(me._ht_info_tooltip.userData.textLines[i], x, y);
				y += me._ht_info_tooltip.userData.lineHeightCanv;
			}
			geometry = new THREE.PlaneGeometry(me._ht_info_tooltip.userData.boxWidthCanv / 200.0, me._ht_info_tooltip.userData.boxHeightCanv / 200.0, 5, 5 );
			geometry.name = 'ht_info_tooltip_geometry';
			me._ht_info_tooltip.geometry.dispose();
			me._ht_info_tooltip.geometry = geometry;
			var diffY = (me._ht_info_tooltip.userData.boxHeightCanv / 2) - me._ht_info_tooltip.userData.height;
			me._ht_info_tooltip.position.y = me._ht_info_tooltip.userData.y - ((diffY / 2.0) / 100.0);
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_info_tooltip_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_info_tooltip.material.map) {
				me._ht_info_tooltip.material.map.dispose();
			}
			me._ht_info_tooltip.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._ht_info_tooltip.children.length; i++) {
				let child = me._ht_info_tooltip.children[i];
				if (child.name.includes('scrollbar')) me._ht_info_tooltip.remove(child);
			}
			var canv = me._ht_info_tooltip.userData.textCanvas;
			var ctx = me._ht_info_tooltip.userData.textCanvasContext;
			ctx.font = '36px Verdana';
			me._ht_info_tooltip.userData.lineHeightCanv = 36 * 1.2;
			me._ht_info_tooltip.userData.textLines = [];
			me._ht_info_tooltip.userData.textLines.push(me._ht_info_tooltip.userData.ggText);
			me._ht_info_tooltip.userData.totalHeightCanv = 2 * (13);
			me._ht_info_tooltip.userData.totalHeightCanv += me._ht_info_tooltip.userData.lineHeightCanv;
			me._ht_info_tooltip.userData.boxWidthCanv = ctx.measureText(me._ht_info_tooltip.userData.ggText).width + (2 * 10);
			me._ht_info_tooltip.userData.boxHeightCanv = me._ht_info_tooltip.userData.totalHeightCanv;
			canv.width = me._ht_info_tooltip.userData.boxWidthCanv;
			canv.height = me._ht_info_tooltip.userData.boxHeightCanv;
			ctx.font = '36px Verdana';
			me._ht_info_tooltip.userData.ggPaintCanvasText();
		}
		me._ht_info_tooltip.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_info_tooltip.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_info_tooltip.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_tooltip.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_tooltip.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_info_tooltip.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_info_tooltip.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_info_tooltip";
		me._ht_info_tooltip.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_info_icon'] == true)) && 
				((player._(me.hotspot.title) != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_info_tooltip.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_info_tooltip.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_info_tooltip.ggCurrentLogicStateVisible == 0) {
			me._ht_info_tooltip.visible=((!me._ht_info_tooltip.material && Number(me._ht_info_tooltip.userData.opacity>0)) || Number(me._ht_info_tooltip.material.opacity)>0)?true:false;
			me._ht_info_tooltip.userData.visible=true;
				}
				else {
			me._ht_info_tooltip.visible=false;
			me._ht_info_tooltip.userData.visible=false;
				}
			}
		}
		me._ht_info_tooltip.logicBlock_visible();
		me._ht_info_tooltip.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info_icon.add(me._ht_info_tooltip);
		me._ht_info.add(me._ht_info_icon);
		geometry = new THREE.PlaneGeometry(3.6, 3.6, 5, 5 );
		geometry.name = 'ht_info_bg_geometry';
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color(0.0862745, 0.0784314, 0.0666667).convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_info_bg_material';
		el = new THREE.Mesh( geometry, material );
		width = 3.6;
		height = 3.6;
		borderShape = new THREE.Shape();
		borderShape.moveTo((-width / 2.0) - 0.02 + 0, (height / 2.0) + 0.02);
		borderShape.lineTo((width / 2.0) + 0.02 - 0, (height / 2.0) + 0.02);
		borderShape.lineTo((width / 2.0) + 0.02, (-height / 2.0) - 0.02 + 0);
		borderShape.lineTo((-width / 2.0) - 0.02 + 0, (-height / 2.0) - 0.02);
		borderShape.lineTo((-width / 2.0) - 0.02, (height / 2.0) + 0.02 - 0);
		innerShape = new THREE.Path();
		innerShape.moveTo((-width / 2.0), (height / 2.0));
		innerShape.lineTo((width / 2.0), (height / 2.0));
		innerShape.lineTo((width / 2.0), (-height / 2.0));
		innerShape.lineTo((-width / 2.0), (-height / 2.0));
		borderShape.holes.push(innerShape);
		borderGeometry = new THREE.ShapeGeometry(borderShape);
		borderGeometry.name = 'ht_info_bg_borderGeometry';
		borderMaterial = new THREE.MeshBasicMaterial( {color: new THREE.Color(0.788235, 0.627451, 0.305882).convertSRGBToLinear(), side: THREE.DoubleSide, transparent: true } );
		borderMaterial.name = 'ht_info_bg_borderMaterial';
		el.userData.border = new THREE.Mesh( borderGeometry, borderMaterial );
		el.userData.border.name = 'ht_info_bg_borderMesh';
		el.add(el.userData.border);
		el.userData.backgroundColorAlpha = 0.85098;
		el.userData.borderColorAlpha = 0.85098;
		el.userData.setOpacityInternal = function(v) {
			me._ht_info_bg.material.opacity = v * me._ht_info_bg.userData.backgroundColorAlpha;
			me._ht_info_bg.userData.border.material.opacity = v * me._ht_info_bg.userData.borderColorAlpha;
			if (me._ht_info_bg.userData.ggSubElement) {
				me._ht_info_bg.userData.ggSubElement.material.opacity = v
				me._ht_info_bg.userData.ggSubElement.visible = (v>0 && me._ht_info_bg.userData.visible);
			}
			me._ht_info_bg.visible = (v>0 && me._ht_info_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_bg.userData.backgroundColorAlpha = v;
			me._ht_info_bg.userData.setOpacity(me._ht_info_bg.userData.opacity);
		}
		el.userData.setBorderColor = function(v) {
			me._ht_info_bg.userData.border.material.color = v;
		}
		el.userData.setBorderColorAlpha = function(v) {
			me._ht_info_bg.userData.borderColorAlpha = v;
			me._ht_info_bg.userData.setOpacity(me._ht_info_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(1.782);
		el.scale.set(1.00, 0.01, 1.0);
		el.userData.width = 360;
		el.userData.height = 360;
		el.userData.scale = {x: 1.00, y: 0.01, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 1.782;
		el.name = 'ht_info_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info_bg.visible
			let parentEl = me._ht_info_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_bg.userData.opacity = v;
			v = v * me._ht_info_bg.userData.parentOpacity;
			me._ht_info_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_bg.children.length; i++) {
				let child = me._ht_info_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_bg.userData.parentOpacity = v;
			v = v * me._ht_info_bg.userData.opacity
			me._ht_info_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_bg.children.length; i++) {
				let child = me._ht_info_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_bg = el;
		el.userData.ggId="ht_info_bg";
		me._ht_info_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				(((player.getVariableValue('vis_info_hotspots') !== null) && (player.getVariableValue('vis_info_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_info_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_info_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_info_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_info_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_info_bg.userData.transitions.length; i++) {
						if (me._ht_info_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_bg.userData.transitions[i].interval);
							me._ht_info_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_info_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_bg.scale.set(transition_scale.startScale.x + (me._ht_info_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_bg.position.x = (me._ht_info_bg.position.x - me._ht_info_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_info_bg.userData.curScaleOffX = scaleOffX;
						me._ht_info_bg.position.y = (me._ht_info_bg.position.y - me._ht_info_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_info_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_bg.userData.transitions.splice(me._ht_info_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_info_bg.userData.transitionValue_scale = {x: 1, y: 0.01, z: 1.0};
					for (var i = 0; i < me._ht_info_bg.userData.transitions.length; i++) {
						if (me._ht_info_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_bg.userData.transitions[i].interval);
							me._ht_info_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_info_bg.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_bg.scale.set(transition_scale.startScale.x + (me._ht_info_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_bg.position.x = (me._ht_info_bg.position.x - me._ht_info_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_info_bg.userData.curScaleOffX = scaleOffX;
						me._ht_info_bg.position.y = (me._ht_info_bg.position.y - me._ht_info_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_info_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_bg.userData.transitions.splice(me._ht_info_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_info_bg.logicBlock_scaling();
		me._ht_info_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('vis_info_hotspots') !== null) && (player.getVariableValue('vis_info_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_info_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_info_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_info_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_info_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_info_bg.userData.transitions.length; i++) {
						if (me._ht_info_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_bg.userData.transitions[i].interval);
							me._ht_info_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_bg.material ? me._ht_info_bg.material.opacity : me._ht_info_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_bg.userData.transitions.splice(me._ht_info_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_info_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_info_bg.userData.transitions.length; i++) {
						if (me._ht_info_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_bg.userData.transitions[i].interval);
							me._ht_info_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_bg.material ? me._ht_info_bg.material.opacity : me._ht_info_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_bg.userData.transitions.splice(me._ht_info_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_info_bg.logicBlock_alpha();
		me._ht_info_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneGeometry(3.4, 3.1, 5, 5 );
		geometry.name = 'ht_info_text_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_info_text_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_info_text.material.opacity = v;
			if (me._ht_info_text.userData.hasScrollbar) {
				me._ht_info_text.userData.scrollbar.material.opacity = v;
				me._ht_info_text.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_info_text.userData.ggSubElement) {
				me._ht_info_text.userData.ggSubElement.material.opacity = v
				me._ht_info_text.userData.ggSubElement.visible = (v>0 && me._ht_info_text.userData.visible);
			}
			me._ht_info_text.visible = (v>0 && me._ht_info_text.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_text.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_text.userData.backgroundColorAlpha = v;
			me._ht_info_text.userData.setOpacity(me._ht_info_text.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.15);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 340;
		el.userData.height = 310;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_text';
		el.userData.x = 0;
		el.userData.y = -0.15;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info_text.visible
			let parentEl = me._ht_info_text.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_text.userData.opacity = v;
			v = v * me._ht_info_text.userData.parentOpacity;
			me._ht_info_text.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_text.children.length; i++) {
				let child = me._ht_info_text.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_text.userData.parentOpacity = v;
			v = v * me._ht_info_text.userData.opacity
			me._ht_info_text.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_text.children.length; i++) {
				let child = me._ht_info_text.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_text = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(1, 1, 1).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0.945098, 0.901961, 0.811765).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 680;
		canvas.height = 620;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_info_text.userData.totalHeightCanv = 2 * (3);
			me._ht_info_text.userData.textLines = [];
			var ctx = me._ht_info_text.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_info_text.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_info_text.userData.textLines.push(line);
					line = '';
					me._ht_info_text.userData.totalHeightCanv += me._ht_info_text.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._ht_info_text.userData.width - 0 - (scrollbar ? 25 : 0))) && i > 0) {
					me._ht_info_text.userData.textLines.push(line);
					line = words[i];
					me._ht_info_text.userData.totalHeightCanv += me._ht_info_text.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._ht_info_text.userData.textLines.push(line);
			me._ht_info_text.userData.totalHeightCanv += me._ht_info_text.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_info_text.userData.textCanvas;
			var ctx = me._ht_info_text.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_info_text.userData.textColor.r * 255 + ', ' + me._ht_info_text.userData.textColor.g * 255 + ', ' + me._ht_info_text.userData.textColor.b * 255 + ', ' + me._ht_info_text.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = 2 * 0;
			ctx.textAlign = 'left';
			var y = 2 * 3;
			y -= me._ht_info_text.userData.scrollPosPercent * me._ht_info_text.userData.totalHeightCanv;
			for (var i = 0; i < me._ht_info_text.userData.textLines.length; i++) {
				ctx.fillText(me._ht_info_text.userData.textLines[i], x, y);
				y += me._ht_info_text.userData.lineHeightCanv;
			}
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_info_text_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_info_text.material.map) {
				me._ht_info_text.material.map.dispose();
			}
			me._ht_info_text.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._ht_info_text.children.length; i++) {
				let child = me._ht_info_text.children[i];
				if (child.name.includes('scrollbar')) me._ht_info_text.remove(child);
			}
			var canv = me._ht_info_text.userData.textCanvas;
			var ctx = me._ht_info_text.userData.textCanvasContext;
			ctx.font = '36px Verdana';
			me._ht_info_text.userData.lineHeightCanv = 36 * 1.2;
			me._ht_info_text.userData.ggWrapText(false);
			me._ht_info_text.userData.boxWidthCanv = 2 * me._ht_info_text.userData.width;
			me._ht_info_text.userData.boxHeightCanv = 2 * me._ht_info_text.userData.height;
			me._ht_info_text.userData.scrollPosPercent = 0.0
			if (me._ht_info_text.userData.totalHeightCanv > (2 * (me._ht_info_text.userData.height))) {
				me._ht_info_text.userData.ggWrapText(true);
				me._ht_info_text.userData.pagePercent = (2 * (me._ht_info_text.userData.height) - me._ht_info_text.userData.lineHeightCanv) / me._ht_info_text.userData.totalHeightCanv;
				me._ht_info_text.userData.maxScrollPercent = (me._ht_info_text.userData.totalHeightCanv - (2 * (me._ht_info_text.userData.height))) / me._ht_info_text.userData.totalHeightCanv;
				geometry = new THREE.PlaneGeometry(25 / 100.0, me._ht_info_text.userData.height / 100.0, 5, 5 );
				geometry.name = 'ht_info_text_scrollbarBgGeometry';
				material = new THREE.MeshBasicMaterial( {color: 0x7f7f7f, side: THREE.DoubleSide, transparent: true } );
				material.name = 'ht_info_text_scrollbarBgMaterial';
				me._ht_info_text.userData.scrollbarBg = new THREE.Mesh( geometry, material );
				me._ht_info_text.userData.scrollbarBg.name = 'ht_info_text_scrollbarBg';
				me._ht_info_text.add(me._ht_info_text.userData.scrollbarBg);
				me._ht_info_text.userData.scrollbarXPos = (me._ht_info_text.userData.width - 25) / 200.0;
				me._ht_info_text.userData.scrollbarBg.position.x = me._ht_info_text.userData.scrollbarXPos;
				me._ht_info_text.userData.scrollbarBg.position.z = me._ht_info_text.position.z + 0.01;
				me._ht_info_text.userData.scrollbarBg.userData.stopPropagation = true;
				me._ht_info_text.userData.scrollbarHeight = ((2 * me._ht_info_text.userData.height) / me._ht_info_text.userData.totalHeightCanv) * me._ht_info_text.userData.height;
				geometry = new THREE.PlaneGeometry(25 / 100.0, me._ht_info_text.userData.scrollbarHeight / 100.0, 5, 5 );
				geometry.name = 'ht_info_text_scrollbarGeometry';
				material = new THREE.MeshBasicMaterial( {color: 0xbfbfbf, side: THREE.DoubleSide, transparent: true } );
				material.name = 'ht_info_text_scrollbarMaterial';
				me._ht_info_text.userData.scrollbar = new THREE.Mesh( geometry, material );
				me._ht_info_text.userData.scrollbar.name = 'ht_info_text_scrollbar';
				me._ht_info_text.add(me._ht_info_text.userData.scrollbar);
				me._ht_info_text.userData.scrollbar.position.x = me._ht_info_text.userData.scrollbarXPos;
				me._ht_info_text.userData.scrollbar.position.z = me._ht_info_text.position.z + 0.02;
				me._ht_info_text.userData.scrollbarYPosMin = (me._ht_info_text.userData.height - me._ht_info_text.userData.scrollbarHeight) / 200.0;
				me._ht_info_text.userData.scrollbarYPosMax = me._ht_info_text.userData.scrollbarYPosMin - (me._ht_info_text.userData.height - me._ht_info_text.userData.scrollbarHeight) / 100.0;
				me._ht_info_text.userData.scrollbar.position.y = me._ht_info_text.userData.scrollbarYPosMin;
				geometry = new THREE.PlaneGeometry(25 / 100.0, me._ht_info_text.userData.height / 200.0, 5, 5 );
				geometry.name = 'ht_info_text_scrollbarPageDownGeometry';
				material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true } );
				material.name = 'ht_info_text_scrollbarPageDownMaterial';
				me._ht_info_text.userData.scrollbarPageDown = new THREE.Mesh( geometry, material );
				me._ht_info_text.userData.scrollbarPageDown.name = 'ht_info_text_scrollbarPageDown';
				me._ht_info_text.userData.scrollbarPageDown.userData.onclick = function() {
					me._ht_info_text.userData.scrollPosPercent -= me._ht_info_text.userData.pagePercent;
					me._ht_info_text.userData.scrollPosPercent = Math.max(me._ht_info_text.userData.scrollPosPercent, 0);
					me._ht_info_text.userData.ggPaintCanvasText();
					me._ht_info_text.userData.scrollbar.position.y += (me._ht_info_text.userData.height * me._ht_info_text.userData.pagePercent) / 100.0;
					me._ht_info_text.userData.scrollbar.position.y = Math.min(me._ht_info_text.userData.scrollbar.position.y, me._ht_info_text.userData.scrollbarYPosMin);
				}
				me._ht_info_text.userData.scrollbarPageDown.position.x = me._ht_info_text.userData.scrollbarXPos;
				me._ht_info_text.userData.scrollbarPageDown.position.y = me._ht_info_text.userData.height / 400.0;
				me._ht_info_text.userData.scrollbarPageDown.position.z = me._ht_info_text.position.z + 0.05;
				me._ht_info_text.userData.scrollbarPageDown.userData.stopPropagation = true;
				me._ht_info_text.userData.scrollbarPageDown.userData.clickInvisible = true;
				me._ht_info_text.userData.scrollbarPageDown.visible = false;
				me._ht_info_text.add(me._ht_info_text.userData.scrollbarPageDown);
				geometry = new THREE.PlaneGeometry(25 / 100.0, me._ht_info_text.userData.height / 200.0, 5, 5 );
				geometry.name = 'ht_info_text_scrollbarPageUpGeometry';
				material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true } );
				material.name = 'ht_info_text_scrollbarPageUpMaterial';
				me._ht_info_text.userData.scrollbarPageUp = new THREE.Mesh( geometry, material );
				me._ht_info_text.userData.scrollbarPageUp.name = 'ht_info_text_scrollbarPageUp';
				me._ht_info_text.userData.scrollbarPageUp.userData.onclick = function() {
					me._ht_info_text.userData.scrollPosPercent += me._ht_info_text.userData.pagePercent;
					me._ht_info_text.userData.scrollPosPercent = Math.min(me._ht_info_text.userData.scrollPosPercent, me._ht_info_text.userData.maxScrollPercent);
					me._ht_info_text.userData.ggPaintCanvasText();
					me._ht_info_text.userData.scrollbar.position.y -= (me._ht_info_text.userData.height * me._ht_info_text.userData.pagePercent) / 100.0;
					me._ht_info_text.userData.scrollbar.position.y = Math.max(me._ht_info_text.userData.scrollbar.position.y, me._ht_info_text.userData.scrollbarYPosMax);
				}
				me._ht_info_text.userData.scrollbarPageUp.position.x = me._ht_info_text.userData.scrollbarXPos;
				me._ht_info_text.userData.scrollbarPageUp.position.y = -me._ht_info_text.userData.height / 400.0;
				me._ht_info_text.userData.scrollbarPageUp.position.z = me._ht_info_text.position.z + 0.05;
				me._ht_info_text.userData.scrollbarPageUp.userData.stopPropagation = true;
				me._ht_info_text.userData.scrollbarPageUp.userData.clickInvisible = true;
				me._ht_info_text.userData.scrollbarPageUp.visible = false;
				me._ht_info_text.add(me._ht_info_text.userData.scrollbarPageUp);
				me._ht_info_text.userData.hasScrollbar = true;
			} else {
				me._ht_info_text.userData.hasScrollbar = false;
			}
			canv.width = me._ht_info_text.userData.boxWidthCanv;
			canv.height = me._ht_info_text.userData.boxHeightCanv;
			ctx.font = '36px Verdana';
			me._ht_info_text.userData.ggPaintCanvasText();
		}
		me._ht_info_text.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.description))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_info_text.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_info_text.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_text.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_text.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_info_text.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_info_text.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_info_text";
		me._ht_info_text.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info_bg.add(me._ht_info_text);
		geometry = new THREE.PlaneGeometry(3.4, 0.25, 5, 5 );
		geometry.name = 'ht_info_title_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_info_title_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_info_title.material.opacity = v;
			if (me._ht_info_title.userData.hasScrollbar) {
				me._ht_info_title.userData.scrollbar.material.opacity = v;
				me._ht_info_title.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_info_title.userData.ggSubElement) {
				me._ht_info_title.userData.ggSubElement.material.opacity = v
				me._ht_info_title.userData.ggSubElement.visible = (v>0 && me._ht_info_title.userData.visible);
			}
			me._ht_info_title.visible = (v>0 && me._ht_info_title.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_title.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_title.userData.backgroundColorAlpha = v;
			me._ht_info_title.userData.setOpacity(me._ht_info_title.userData.opacity);
		}
		el.translateX(0);
		el.translateY(1.565);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 340;
		el.userData.height = 25;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_title';
		el.userData.x = 0;
		el.userData.y = 1.565;
		el.userData.hanchor = 1;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info_title.visible
			let parentEl = me._ht_info_title.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_title.userData.opacity = v;
			v = v * me._ht_info_title.userData.parentOpacity;
			me._ht_info_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_title.children.length; i++) {
				let child = me._ht_info_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_title.userData.parentOpacity = v;
			v = v * me._ht_info_title.userData.opacity
			me._ht_info_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_title.children.length; i++) {
				let child = me._ht_info_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_title = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(1, 1, 1).convertSRGBToLinear();
		el.userData.textColor = new THREE.Color(0.945098, 0.901961, 0.811765).convertSRGBToLinear();
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 680;
		canvas.height = 50;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_info_title.userData.totalHeightCanv = 2 * (3);
			me._ht_info_title.userData.textLines = [];
			var ctx = me._ht_info_title.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_info_title.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_info_title.userData.textLines.push(line);
					line = '';
					me._ht_info_title.userData.totalHeightCanv += me._ht_info_title.userData.lineHeightCanv;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (2 * (me._ht_info_title.userData.width - 0 - (scrollbar ? 25 : 0))) && i > 0) {
					me._ht_info_title.userData.textLines.push(line);
					line = words[i];
					me._ht_info_title.userData.totalHeightCanv += me._ht_info_title.userData.lineHeightCanv;
				} else {
					line = testLine;
				}
			}
			me._ht_info_title.userData.textLines.push(line);
			me._ht_info_title.userData.totalHeightCanv += me._ht_info_title.userData.lineHeightCanv;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_info_title.userData.textCanvas;
			var ctx = me._ht_info_title.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_info_title.userData.textColor.r * 255 + ', ' + me._ht_info_title.userData.textColor.g * 255 + ', ' + me._ht_info_title.userData.textColor.b * 255 + ', ' + me._ht_info_title.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_info_title.userData.boxWidthCanv - (me._ht_info_title.userData.hasScrollbar ? 50 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 2 * 3;
			for (var i = 0; i < me._ht_info_title.userData.textLines.length; i++) {
				var curTextLine = me._ht_info_title.userData.textLines[i];
				var curTextLineBase = me._ht_info_title.userData.textLines[i];
				if ((ctx.measureText(curTextLine).width + (2 * 0)) > canv.width) {
					var cutChars = 0;
					do {
						cutChars++;
						curTextLine = curTextLineBase.substring(0, curTextLineBase.length - cutChars) + '...';
					} while (cutChars < curTextLineBase.length && (ctx.measureText(curTextLine).width + (2 * 0)) > canv.width);
				}
				ctx.fillText(curTextLine, x, y);
				y += me._ht_info_title.userData.lineHeightCanv;
			}
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_info_title_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.colorSpace = THREE.LinearSRGBColorSpace;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_info_title.material.map) {
				me._ht_info_title.material.map.dispose();
			}
			me._ht_info_title.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			for (let i = 0; i < me._ht_info_title.children.length; i++) {
				let child = me._ht_info_title.children[i];
				if (child.name.includes('scrollbar')) me._ht_info_title.remove(child);
			}
			var canv = me._ht_info_title.userData.textCanvas;
			var ctx = me._ht_info_title.userData.textCanvasContext;
			ctx.font = '44px Verdana';
			me._ht_info_title.userData.lineHeightCanv = 44 * 1.2;
			me._ht_info_title.userData.textLines = [];
			me._ht_info_title.userData.textLines.push(me._ht_info_title.userData.ggText);
			me._ht_info_title.userData.totalHeightCanv = 2 * (3);
			me._ht_info_title.userData.totalHeightCanv += me._ht_info_title.userData.lineHeightCanv;
			me._ht_info_title.userData.boxWidthCanv = 2 * me._ht_info_title.userData.width;
			me._ht_info_title.userData.boxHeightCanv = 2 * me._ht_info_title.userData.height;
			me._ht_info_title.userData.hasScrollbar = false;
			canv.width = me._ht_info_title.userData.boxWidthCanv;
			canv.height = me._ht_info_title.userData.boxHeightCanv;
			ctx.font = '44px Verdana';
			me._ht_info_title.userData.ggPaintCanvasText();
		}
		me._ht_info_title.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_info_title.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_info_title.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_title.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_title.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_info_title.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_info_title.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_info_title";
		me._ht_info_title.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info_bg.add(me._ht_info_title);
		me._ht_info.add(me._ht_info_bg);
		geometry = new THREE.PlaneGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'ht_info_close_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		texture.colorSpace = player.getVRTextureColorSpace();
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_info_close_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(2.1);
		el.translateY(1.575);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_close';
		el.userData.x = 2.1;
		el.userData.y = 1.575;
		el.userData.hanchor = 1;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_info_close.material) me._ht_info_close.material.opacity = v;
			me._ht_info_close.visible = (v>0 && me._ht_info_close.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_info_close.visible
			let parentEl = me._ht_info_close.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_close.userData.opacity = v;
			v = v * me._ht_info_close.userData.parentOpacity;
			me._ht_info_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_close.children.length; i++) {
				let child = me._ht_info_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_close.userData.parentOpacity = v;
			v = v * me._ht_info_close.userData.opacity
			me._ht_info_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_close.children.length; i++) {
				let child = me._ht_info_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_close = el;
		el.userData.ggId="ht_info_close";
		me._ht_info_close.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_info_close'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_info_close.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_info_close.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_info_close.ggCurrentLogicStateScaling == 0) {
					me._ht_info_close.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._ht_info_close.userData.transitions.length; i++) {
						if (me._ht_info_close.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_close.userData.transitions[i].interval);
							me._ht_info_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_info_close.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_close.scale.set(transition_scale.startScale.x + (me._ht_info_close.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_close.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_close.position.x = (me._ht_info_close.position.x - me._ht_info_close.userData.curScaleOffX) + scaleOffX;
						me._ht_info_close.userData.curScaleOffX = scaleOffX;
						me._ht_info_close.position.y = (me._ht_info_close.position.y - me._ht_info_close.userData.curScaleOffY) + scaleOffY;
						me._ht_info_close.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_close.userData.transitions.splice(me._ht_info_close.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_close.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_info_close.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_info_close.userData.transitions.length; i++) {
						if (me._ht_info_close.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_close.userData.transitions[i].interval);
							me._ht_info_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = structuredClone(me._ht_info_close.scale);
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_close.scale.set(transition_scale.startScale.x + (me._ht_info_close.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_close.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_close.position.x = (me._ht_info_close.position.x - me._ht_info_close.userData.curScaleOffX) + scaleOffX;
						me._ht_info_close.userData.curScaleOffX = scaleOffX;
						me._ht_info_close.position.y = (me._ht_info_close.position.y - me._ht_info_close.userData.curScaleOffY) + scaleOffY;
						me._ht_info_close.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_close.userData.transitions.splice(me._ht_info_close.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_close.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_info_close.logicBlock_scaling();
		me._ht_info_close.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('vis_info_hotspots') !== null) && (player.getVariableValue('vis_info_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_info_close.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_info_close.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_info_close.ggCurrentLogicStateAlpha == 0) {
					me._ht_info_close.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_info_close.userData.transitions.length; i++) {
						if (me._ht_info_close.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_close.userData.transitions[i].interval);
							me._ht_info_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_close.material ? me._ht_info_close.material.opacity : me._ht_info_close.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_close.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_close.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_close.userData.transitions.splice(me._ht_info_close.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_close.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_info_close.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_info_close.userData.transitions.length; i++) {
						if (me._ht_info_close.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_close.userData.transitions[i].interval);
							me._ht_info_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_close.material ? me._ht_info_close.material.opacity : me._ht_info_close.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_close.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_close.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_close.userData.transitions.splice(me._ht_info_close.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_close.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_info_close.logicBlock_alpha();
		me._ht_info_close.userData.onclick=function (e) {
			player.setVariableValue('vis_info_hotspots', player.getVariableValue('vis_info_hotspots').replace("<"+me.hotspot.id+">", ''));
		}
		me._ht_info_close.userData.onmouseenter=function (e) {
			me.elementMouseOver['ht_info_close']=true;
			me._ht_info_close.logicBlock_scaling();
		}
		me._ht_info_close.userData.ontouchend=function (e) {
			me._ht_info_close.logicBlock_scaling();
		}
		me._ht_info_close.userData.onmouseleave=function (e) {
			me.elementMouseOver['ht_info_close']=false;
			me._ht_info_close.logicBlock_scaling();
		}
		me._ht_info_close.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info.add(me._ht_info_close);
		el = new THREE.Group();
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_info_customimage.userData.ggSubElement) {
				me._ht_info_customimage.userData.ggSubElement.material.opacity = v
				me._ht_info_customimage.userData.ggSubElement.visible = (v>0 && me._ht_info_customimage.userData.visible);
			}
			me._ht_info_customimage.visible = (v>0 && me._ht_info_customimage.userData.visible);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 50;
		el.userData.height = 50;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_CustomImage';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info_customimage.visible
			let parentEl = me._ht_info_customimage.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_customimage.userData.opacity = v;
			v = v * me._ht_info_customimage.userData.parentOpacity;
			me._ht_info_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_customimage.children.length; i++) {
				let child = me._ht_info_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_customimage.userData.parentOpacity = v;
			v = v * me._ht_info_customimage.userData.opacity
			me._ht_info_customimage.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_customimage.children.length; i++) {
				let child = me._ht_info_customimage.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_customimage = el;
		currentWidth = 50;
		currentHeight = 50;
		var img = {};
		img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
		img.geometry.name = 'ht_info_CustomImage_imgGeometry';
		loader = new THREE.TextureLoader();
		el.userData.ggSetUrl = function(extUrl) {
			loader.load(extUrl,
				function (texture) {
				texture.colorSpace = player.getVRTextureColorSpace();
				var loadedMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
				loadedMaterial.name = 'ht_info_CustomImage_subElementMaterial';
				me._ht_info_customimage.userData.ggSubElement.material = loadedMaterial;
				me._ht_info_customimage.userData.ggUpdatePosition();
				me._ht_info_customimage.userData.ggText = extUrl;
				me._ht_info_customimage.userData.setOpacity(me._ht_info_customimage.userData.opacity);
			});
		};
		if ((hotspot) && (hotspot.customimage)) {
			var extUrl=hotspot.customimage;
		}
		el.userData.ggSetUrl(extUrl);
		material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true } );
		material.name = 'ht_info_CustomImage_subElementMaterial';
		el.userData.ggSubElement = new THREE.Mesh( img.geometry, material );
		el.userData.ggSubElement.name = 'ht_info_CustomImage_subElement';
		el.userData.ggSubElement.position.z = el.position.z + 0.005;
		el.add(el.userData.ggSubElement);
		el.userData.clientWidth = 50;
		el.userData.clientHeight = 50;
		el.userData.ggId="ht_info_CustomImage";
		me._ht_info_customimage.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(((player.getVariableValue('vis_info_hotspots') !== null) && (player.getVariableValue('vis_info_hotspots')).indexOf("<"+me.hotspot.id+">") == -1)) && 
				((me.hotspot.customimage != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_info_customimage.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_info_customimage.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_info_customimage.ggCurrentLogicStateVisible == 0) {
			me._ht_info_customimage.visible=((!me._ht_info_customimage.material && Number(me._ht_info_customimage.userData.opacity>0)) || Number(me._ht_info_customimage.material.opacity)>0)?true:false;
			me._ht_info_customimage.userData.visible=true;
				}
				else {
			me._ht_info_customimage.visible=false;
			me._ht_info_customimage.userData.visible=false;
				}
			}
		}
		me._ht_info_customimage.logicBlock_visible();
		me._ht_info_customimage.userData.onclick=function (e) {
			player.setVariableValue('vis_info_hotspots', player.getVariableValue('vis_info_hotspots') + "<"+me.hotspot.id+">");
		}
		me._ht_info_customimage.userData.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_info_customimage.userData.clientWidth;
			var parentHeight = me._ht_info_customimage.userData.clientHeight;
			var img = me._ht_info_customimage.userData.ggSubElement;
			var imgWidth = img.material.map.image.naturalWidth;
			var imgHeight = img.material.map.image.naturalHeight;
			var aspectRatioDiv = parentWidth / parentHeight;
			var aspectRatioImg = imgWidth / imgHeight;
			if (imgWidth < parentWidth) parentWidth = imgWidth;
			if (imgHeight < parentHeight) parentHeight = imgHeight;
			var currentWidth, currentHeight;
			img.geometry.dispose();
			if ((hotspot) && (hotspot.customimage)) {
				currentWidth  = hotspot.customimagewidth;
				currentHeight = hotspot.customimageheight;
			img.geometry = new THREE.PlaneGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
			img.geometry.name = 'ht_info_CustomImage_imgGeometry';
			}
		}
		me._ht_info.add(me._ht_info_customimage);
		me._ht_info.userData.setOpacity(1.00);
		me.elementMouseOver['ht_info']=false;
		me._ht_info_icon.logicBlock_scaling();
		me._ht_info_icon.logicBlock_visible();
		me._ht_info_icon.userData.setOpacity(1.00);
		me.elementMouseOver['ht_info_icon']=false;
		me._ht_info_tooltip.logicBlock_visible();
		me._ht_info_tooltip.userData.setOpacity(1.00);
		me._ht_info_bg.logicBlock_scaling();
		me._ht_info_bg.logicBlock_alpha();
		me._ht_info_bg.userData.setOpacity(0.00);
		me._ht_info_text.userData.setOpacity(1.00);
		me._ht_info_title.userData.setOpacity(1.00);
		me._ht_info_close.logicBlock_scaling();
		me._ht_info_close.logicBlock_alpha();
		me._ht_info_close.userData.setOpacity(0.00);
		me.elementMouseOver['ht_info_close']=false;
		me._ht_info_customimage.logicBlock_visible();
		me._ht_info_customimage.userData.setOpacity(1.00);
			me.ggEvent_activehotspotchanged=function() {
				me._ht_info_icon.logicBlock_visible();
				me._ht_info_tooltip.logicBlock_visible();
				me._ht_info_customimage.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._ht_info_icon.logicBlock_visible();
					me._ht_info_tooltip.userData.ggUpdateText();
				me._ht_info_tooltip.logicBlock_visible();
				me._ht_info_bg.logicBlock_scaling();
				me._ht_info_bg.logicBlock_alpha();
					me._ht_info_text.userData.ggUpdateText();
					me._ht_info_title.userData.ggUpdateText();
				me._ht_info_close.logicBlock_alpha();
				me._ht_info_customimage.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._ht_info_icon.logicBlock_visible();
				me._ht_info_tooltip.logicBlock_visible();
				me._ht_info_bg.logicBlock_scaling();
				me._ht_info_bg.logicBlock_alpha();
				me._ht_info_close.logicBlock_alpha();
				me._ht_info_customimage.logicBlock_visible();
			};
			me.ggEvent_varchanged_vis_info_hotspots=function() {
				me._ht_info_icon.logicBlock_visible();
				me._ht_info_bg.logicBlock_scaling();
				me._ht_info_bg.logicBlock_alpha();
				me._ht_info_close.logicBlock_alpha();
				me._ht_info_customimage.logicBlock_visible();
			};
			me.__obj = me._ht_info;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		if (hotspot.skinid=='ht_info') {
			hotspot.skinid = 'ht_info';
			hsinst = new SkinHotspotClass_ht_info(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_image') {
			hotspot.skinid = 'ht_image';
			hsinst = new SkinHotspotClass_ht_image(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_node') {
			hotspot.skinid = 'ht_node';
			hsinst = new SkinHotspotClass_ht_node(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_video_file') {
			hotspot.skinid = 'ht_video_file';
			hsinst = new SkinHotspotClass_ht_video_file(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_video_url') {
			hotspot.skinid = 'ht_video_url';
			hsinst = new SkinHotspotClass_ht_video_url(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		}
		return (hsinst ? hsinst.__obj : null);
	}
	me.removeSkinHotspots=function() {
		hotspotTemplates = [];
	}
	me.skinTimerEvent=function() {
		if (!player.isInVR()) return;
		me.ggCurrentTime=new Date().getTime();
	};
	player.addListener('timer', me.skinTimerEvent);
	player.addListener('vrconfigloaded', function() { me.addSkin();if (me.eventconfigloadedCallback) me.eventconfigloadedCallback();if (me.eventchangenodeCallback) me.eventchangenodeCallback();});
	player.addListener('exitvr', function() { me.removeSkin(); });
	me.skinTimerEvent();
};