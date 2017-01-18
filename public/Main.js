var Main = (function () { 'use strict';

var template = (function () {
    // @todo re-add when support in Svelte is added
    //import Parse from 'avitext-parser';

    const initValues = {
        avitext: '',
        reports: [],
        csvString: null
    };

    const generateCsvString = reports =>
        reports.reduce((prev, current) => (prev + '\n' + current.toCsv()), '');

    return {
        data () {
            return initValues;
        },
        methods: {
            add () {
                const avitext = this.get('avitext');
                const reports = this.get('reports');
                reports.push(new Parse(avitext));
                console.log('new parse', new Parse(avitext));

                this.set({
                    reports,
                    csvString: encodeURI(generateCsvString(reports))
                });
                this.set({avitext: ''});
            },
            remove (index) {
                const reports = this.get('reports');
                reports.splice(index, 1);

                this.set({
                    reports,
                    csvString: encodeURI(generateCsvString(reports))
                });
            },
            reset () {
                this.set(initValues);
            }
        },
        helpers: {
            calculateTotal (val) {  
                return val.male.total.toInt() +
                    val.female.total.toInt() +
                    val.juvenile.toInt() +
                    val.immature.toInt() +
                    val.adult.toInt() +
                    val.unspecified.toInt();
            }
        }
    }
}());

let addedCss = false;
function addCss () {
	var style = createElement( 'style' );
	style.textContent = "\n    .avitext[svelte-2360266922], [svelte-2360266922] .avitext {\n        font-family: monospace;\n    }\n    .watermark[svelte-2360266922], [svelte-2360266922] .watermark {\n        position: fixed;\n        opacity: 0.685;\n        z-index: 99;\n        text-align: right;\n    }\n    .header[svelte-2360266922], [svelte-2360266922] .header {\n        top: 0.125em;\n        right: 10px;\n    }\n    .subheader[svelte-2360266922], [svelte-2360266922] .subheader {\n        top: 2.675em;\n        right: 10px;\n        width: 13em;\n    }\n";
	appendNode( style, document.head );

	addedCss = true;
}

function renderMainFragment ( root, component ) {
	var h1 = createElement( 'h1' );
	setAttribute( h1, 'svelte-2360266922', '' );
	h1.className = "watermark header";
	
	appendNode( createText( "Avitext-to-eBird" ), h1 );
	var text1 = createText( "\n" );
	
	var p = createElement( 'p' );
	setAttribute( p, 'svelte-2360266922', '' );
	p.className = "watermark subheader";
	
	appendNode( createText( "Converts " ), p );
	
	var a = createElement( 'a' );
	setAttribute( a, 'svelte-2360266922', '' );
	a.href = "https://github.com/rgeraldporter/avitext-spec";
	a.target = "_blank";
	
	appendNode( a, p );
	appendNode( createText( "Avitext checklist" ), a );
	appendNode( createText( " files into a CSV file for import into eBird." ), p );
	var text5 = createText( "\n\n" );
	
	var textarea = createElement( 'textarea' );
	setAttribute( textarea, 'svelte-2360266922', '' );
	
	var textarea_updating = false;
	
	function textareaChangeHandler () {
		textarea_updating = true;
		component.set({ avitext: textarea.value });
		textarea_updating = false;
	}
	
	addEventListener( textarea, 'change', textareaChangeHandler );
	textarea.value = root.avitext;
	
	textarea.placeholder = "Paste your Avitext checklist here";
	textarea.rows = "25";
	setAttribute( textarea, 'onmouseup', "return false;" );
	textarea.className = "pure-u-5-5 pure-input-rounded avitext";
	
	var text6 = createText( "\n\n" );
	
	var button = createElement( 'button' );
	setAttribute( button, 'svelte-2360266922', '' );
	
	function clickHandler ( event ) {
		component.add();
	}
	
	addEventListener( button, 'click', clickHandler );
	
	button.className = "pure-button pure-button-primary";
	
	appendNode( createText( "Add to eBird CSV" ), button );
	var text8 = createText( "\n\n" );
	
	var button1 = createElement( 'button' );
	setAttribute( button1, 'svelte-2360266922', '' );
	
	function clickHandler1 ( event ) {
		component.reset();
	}
	
	addEventListener( button1, 'click', clickHandler1 );
	
	button1.className = "pure-button";
	
	appendNode( createText( "Start new CSV" ), button1 );
	var text10 = createText( "\n\n" );
	var ifBlock_anchor = createComment( "#if reports.length" );
	
	function getBlock ( root ) {
		if ( root.reports.length ) return renderIfBlock_0;
		return renderIfBlock_1;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );
	
	var text11 = createText( "\n\n" );
	var eachBlock_anchor = createComment( "#each reports" );
	var eachBlock_value = root.reports;
	var eachBlock_iterations = [];
	
	for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
		eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
	}

	return {
		mount: function ( target, anchor ) {
			insertNode( h1, target, anchor );
			insertNode( text1, target, anchor );
			insertNode( p, target, anchor );
			insertNode( text5, target, anchor );
			insertNode( textarea, target, anchor );
			insertNode( text6, target, anchor );
			insertNode( button, target, anchor );
			insertNode( text8, target, anchor );
			insertNode( button1, target, anchor );
			insertNode( text10, target, anchor );
			insertNode( ifBlock_anchor, target, anchor );
			if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
			insertNode( text11, target, anchor );
			insertNode( eachBlock_anchor, target, anchor );
			
			for ( var i = 0; i < eachBlock_iterations.length; i += 1 ) {
				eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
			}
		},
		
		update: function ( changed, root ) {
			if ( !textarea_updating ) textarea.value = root.avitext;
			
			var _currentBlock = currentBlock;
			currentBlock = getBlock( root );
			if ( _currentBlock === currentBlock && ifBlock) {
				ifBlock.update( changed, root );
			} else {
				if ( ifBlock ) ifBlock.teardown( true );
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
			}
			
			var eachBlock_value = root.reports;
			
			for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
				if ( !eachBlock_iterations[i] ) {
					eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
					eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
				} else {
					eachBlock_iterations[i].update( changed, root, eachBlock_value, eachBlock_value[i], i );
				}
			}
			
			teardownEach( eachBlock_iterations, true, eachBlock_value.length );
			
			eachBlock_iterations.length = eachBlock_value.length;
		},
		
		teardown: function ( detach ) {
			removeEventListener( textarea, 'change', textareaChangeHandler );
			removeEventListener( button, 'click', clickHandler );
			removeEventListener( button1, 'click', clickHandler1 );
			if ( ifBlock ) ifBlock.teardown( detach );
			
			teardownEach( eachBlock_iterations, detach );
			
			if ( detach ) {
				detachNode( h1 );
				detachNode( text1 );
				detachNode( p );
				detachNode( text5 );
				detachNode( textarea );
				detachNode( text6 );
				detachNode( button );
				detachNode( text8 );
				detachNode( button1 );
				detachNode( text10 );
				detachNode( ifBlock_anchor );
				detachNode( text11 );
				detachNode( eachBlock_anchor );
			}
		}
	};
}

function renderEachBlock ( root, eachBlock_value, report, index, component ) {
	var hr = createElement( 'hr' );
	setAttribute( hr, 'svelte-2360266922', '' );
	
	var text = createText( "\n    " );
	
	var table = createElement( 'table' );
	setAttribute( table, 'svelte-2360266922', '' );
	table.className = "pure-table";
	setAttribute( table, 'sortable', true );
	
	var caption = createElement( 'caption' );
	setAttribute( caption, 'svelte-2360266922', '' );
	
	appendNode( caption, table );
	appendNode( createText( "Checklist on " ), caption );
	var text2 = createText( report.checklist.date.emit() );
	appendNode( text2, caption );
	appendNode( createText( " at " ), caption );
	var text4 = createText( report.checklist.location.emit() );
	appendNode( text4, caption );
	appendNode( createText( "\n            " ), caption );
	
	var a = createElement( 'a' );
	setAttribute( a, 'svelte-2360266922', '' );
	a.href = "#";
	
	function clickHandler ( event ) {
		var eachBlock_value = this.__svelte.eachBlock_value, index = this.__svelte.index, report = eachBlock_value[index]
		
		component.remove(index);
	}
	
	addEventListener( a, 'click', clickHandler );
	
	a.__svelte = {
		eachBlock_value: eachBlock_value,
		index: index
	};
	
	appendNode( a, caption );
	appendNode( createText( "[x Remove]" ), a );
	appendNode( createText( "\n        " ), table );
	
	var thead = createElement( 'thead' );
	setAttribute( thead, 'svelte-2360266922', '' );
	
	appendNode( thead, table );
	
	var tr = createElement( 'tr' );
	setAttribute( tr, 'svelte-2360266922', '' );
	
	appendNode( tr, thead );
	
	var th = createElement( 'th' );
	setAttribute( th, 'svelte-2360266922', '' );
	
	appendNode( th, tr );
	appendNode( createText( "Identifier" ), th );
	
	var th1 = createElement( 'th' );
	setAttribute( th1, 'svelte-2360266922', '' );
	
	appendNode( th1, tr );
	appendNode( createText( "Common Name" ), th1 );
	
	var th2 = createElement( 'th' );
	setAttribute( th2, 'svelte-2360266922', '' );
	
	appendNode( th2, tr );
	appendNode( createText( "Total Count" ), th2 );
	
	var th3 = createElement( 'th' );
	setAttribute( th3, 'svelte-2360266922', '' );
	
	appendNode( th3, tr );
	appendNode( createText( "Comments" ), th3 );
	appendNode( createText( "\n        " ), table );
	
	var tbody = createElement( 'tbody' );
	setAttribute( tbody, 'svelte-2360266922', '' );
	
	appendNode( tbody, table );
	var eachBlock1_anchor = createComment( "#each report.checklist.species" );
	appendNode( eachBlock1_anchor, tbody );
	var eachBlock1_value = report.checklist.species;
	var eachBlock1_iterations = [];
	
	for ( var i = 0; i < eachBlock1_value.length; i += 1 ) {
		eachBlock1_iterations[i] = renderEachBlock1( root, eachBlock_value, report, index, eachBlock1_value, eachBlock1_value[i], i, component );
		eachBlock1_iterations[i].mount( eachBlock1_anchor.parentNode, eachBlock1_anchor );
	}

	return {
		mount: function ( target, anchor ) {
			insertNode( hr, target, anchor );
			insertNode( text, target, anchor );
			insertNode( table, target, anchor );
		},
		
		update: function ( changed, root, eachBlock_value, report, index ) {
			text2.data = report.checklist.date.emit();
			
			text4.data = report.checklist.location.emit();
			
			a.__svelte.eachBlock_value = eachBlock_value;
			a.__svelte.index = index;
			
			var eachBlock1_value = report.checklist.species;
			
			for ( var i = 0; i < eachBlock1_value.length; i += 1 ) {
				if ( !eachBlock1_iterations[i] ) {
					eachBlock1_iterations[i] = renderEachBlock1( root, eachBlock_value, report, index, eachBlock1_value, eachBlock1_value[i], i, component );
					eachBlock1_iterations[i].mount( eachBlock1_anchor.parentNode, eachBlock1_anchor );
				} else {
					eachBlock1_iterations[i].update( changed, root, eachBlock_value, report, index, eachBlock1_value, eachBlock1_value[i], i );
				}
			}
			
			teardownEach( eachBlock1_iterations, true, eachBlock1_value.length );
			
			eachBlock1_iterations.length = eachBlock1_value.length;
		},
		
		teardown: function ( detach ) {
			removeEventListener( a, 'click', clickHandler );
			
			teardownEach( eachBlock1_iterations, false );
			
			if ( detach ) {
				detachNode( hr );
				detachNode( text );
				detachNode( table );
			}
		}
	};
}

function renderEachBlock1 ( root, eachBlock_value, report, index, eachBlock1_value, taxon, taxon__index, component ) {
	var tr = createElement( 'tr' );
	setAttribute( tr, 'svelte-2360266922', '' );
	
	var td = createElement( 'td' );
	setAttribute( td, 'svelte-2360266922', '' );
	
	appendNode( td, tr );
	var text = createText( taxon.identifier.emit() );
	appendNode( text, td );
	appendNode( createText( "\n                " ), tr );
	
	var td1 = createElement( 'td' );
	setAttribute( td1, 'svelte-2360266922', '' );
	
	appendNode( td1, tr );
	var text2 = createText( taxon.commonName.emit() );
	appendNode( text2, td1 );
	appendNode( createText( "\n                " ), tr );
	
	var td2 = createElement( 'td' );
	setAttribute( td2, 'svelte-2360266922', '' );
	
	appendNode( td2, tr );
	var text4 = createText( template.helpers.calculateTotal(taxon.phenotype) );
	appendNode( text4, td2 );
	appendNode( createText( "\n                " ), tr );
	
	var td3 = createElement( 'td' );
	setAttribute( td3, 'svelte-2360266922', '' );
	
	appendNode( td3, tr );
	var text6 = createText( taxon.comment.emit() );
	appendNode( text6, td3 );

	return {
		mount: function ( target, anchor ) {
			insertNode( tr, target, anchor );
		},
		
		update: function ( changed, root, eachBlock_value, report, index, eachBlock1_value, taxon, taxon__index ) {
			text.data = taxon.identifier.emit();
			
			text2.data = taxon.commonName.emit();
			
			text4.data = template.helpers.calculateTotal(taxon.phenotype);
			
			text6.data = taxon.comment.emit();
		},
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( tr );
			}
		}
	};
}

function renderIfBlock_1 ( root, component ) {
	var div = createElement( 'div' );
	setAttribute( div, 'svelte-2360266922', '' );
	div.className = "pure-button pure-button-disabled";
	
	appendNode( createText( "Download Full CSV" ), div );

	return {
		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
		},
		
		update: noop,
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( div );
			}
		}
	};
}

function renderIfBlock_0 ( root, component ) {
	var a = createElement( 'a' );
	setAttribute( a, 'svelte-2360266922', '' );
	a.href = "data:text/csv;charset=utf-8," + ( root.csvString );
	setAttribute( a, 'taget', "_blank" );
	a.className = "pure-button";
	a.download = "ebird-import.csv";
	
	appendNode( createText( "Download Full CSV (" ), a );
	var text1 = createText( root.reports.length );
	appendNode( text1, a );
	appendNode( createText( " checklist" ), a );
	var text3 = createText( root.reports.length === 1 ? '' : 's' );
	appendNode( text3, a );
	appendNode( createText( ")" ), a );

	return {
		mount: function ( target, anchor ) {
			insertNode( a, target, anchor );
		},
		
		update: function ( changed, root ) {
			a.href = "data:text/csv;charset=utf-8," + ( root.csvString );
			
			text1.data = root.reports.length;
			
			text3.data = root.reports.length === 1 ? '' : 's';
		},
		
		teardown: function ( detach ) {
			if ( detach ) {
				detachNode( a );
			}
		}
	};
}

function Main ( options ) {
	options = options || {};
	
	this._state = Object.assign( template.data(), options.data );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root;
	this._yield = options._yield;

	if ( !addedCss ) addCss();
	
	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
}

Main.prototype = template.methods;

Main.prototype.get = function get( key ) {
 	return key ? this._state[ key ] : this._state;
 };

Main.prototype.fire = function fire( eventName, data ) {
 	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
 	if ( !handlers ) return;
 
 	for ( var i = 0; i < handlers.length; i += 1 ) {
 		handlers[i].call( this, data );
 	}
 };

Main.prototype.observe = function observe( key, callback, options ) {
 	var group = ( options && options.defer ) ? this._observers.pre : this._observers.post;
 
 	( group[ key ] || ( group[ key ] = [] ) ).push( callback );
 
 	if ( !options || options.init !== false ) {
 		callback.__calling = true;
 		callback.call( this, this._state[ key ] );
 		callback.__calling = false;
 	}
 
 	return {
 		cancel: function () {
 			var index = group[ key ].indexOf( callback );
 			if ( ~index ) group[ key ].splice( index, 1 );
 		}
 	};
 };

Main.prototype.on = function on( eventName, handler ) {
 	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
 	handlers.push( handler );
 
 	return {
 		cancel: function () {
 			var index = handlers.indexOf( handler );
 			if ( ~index ) handlers.splice( index, 1 );
 		}
 	};
 };

Main.prototype.set = function set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

Main.prototype.teardown = function teardown ( detach ) {
	this.fire( 'teardown' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
};

function dispatchObservers( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

		var callbacks = group[ key ];
		if ( !callbacks ) continue;

		for ( var i = 0; i < callbacks.length; i += 1 ) {
			var callback = callbacks[i];
			if ( callback.__calling ) continue;

			callback.__calling = true;
			callback.call( component, newValue, oldValue );
			callback.__calling = false;
		}
	}
}

function createElement( name ) {
	return document.createElement( name );
}

function setAttribute( node, attribute, value ) {
	node.setAttribute ( attribute, value );
}

function detachNode( node ) {
	node.parentNode.removeChild( node );
}

function insertNode( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function appendNode( node, target ) {
	target.appendChild( node );
}

function createText( data ) {
	return document.createTextNode( data );
}

function addEventListener( node, event, handler ) {
	node.addEventListener ( event, handler, false );
}

function removeEventListener( node, event, handler ) {
	node.removeEventListener ( event, handler, false );
}

function noop() {}

function createComment( data ) {
	return document.createComment( data );
}

function teardownEach( iterations, detach, start ) {
	for ( var i = ( start || 0 ); i < iterations.length; i += 1 ) {
		iterations[i].teardown( detach );
	}
}

return Main;

}());