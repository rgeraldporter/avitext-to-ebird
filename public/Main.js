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

                this.set({
                    reports,
                    csvString: encodeURI(generateCsvString(reports))
                });
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
	var style = document.createElement( 'style' );
	style.textContent = "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              \n    .avitext[svelte-847749836], [svelte-847749836] .avitext {\n        font-family: monospace;\n    }\n    .watermark[svelte-847749836], [svelte-847749836] .watermark {\n        position: fixed;\n        opacity: 0.685;\n        z-index: 99;\n        text-align: right;\n    }\n    .header[svelte-847749836], [svelte-847749836] .header {\n        top: 0.125em;\n        right: 10px;\n    }\n    .subheader[svelte-847749836], [svelte-847749836] .subheader {\n        top: 2.675em;\n        right: 10px;\n        width: 13em;\n    }\n";
	document.head.appendChild( style );

	addedCss = true;
}

function renderMainFragment ( root, component ) {
	var h1 = document.createElement( 'h1' );
	h1.setAttribute( 'svelte-847749836', '' );
	h1.className = "watermark header";
	
	h1.appendChild( document.createTextNode( "Avitext-to-eBird" ) );
	
	var text1 = document.createTextNode( "\n" );
	
	var p = document.createElement( 'p' );
	p.setAttribute( 'svelte-847749836', '' );
	p.className = "watermark subheader";
	
	p.appendChild( document.createTextNode( "Converts " ) );
	
	var a = document.createElement( 'a' );
	a.href = "https://github.com/rgeraldporter/avitext-spec";
	a.target = "_blank";
	
	p.appendChild( a );
	
	a.appendChild( document.createTextNode( "Avitext checklist" ) );
	
	p.appendChild( document.createTextNode( " files into a CSV file for import into eBird." ) );
	
	var text5 = document.createTextNode( "\n\n" );
	
	var textarea = document.createElement( 'textarea' );
	textarea.setAttribute( 'svelte-847749836', '' );
	var textarea_updating = false;
	
	function textareaChangeHandler () {
		textarea_updating = true;
		component.set({ avitext: textarea.value });
		textarea_updating = false;
	}
	
	textarea.addEventListener( 'change', textareaChangeHandler, false );
	textarea.value = root.avitext;
	textarea.placeholder = "Paste your Avitext checklist here";
	textarea.rows = "25";
	textarea.setAttribute( 'onfocus', "this.select();" );
	textarea.setAttribute( 'onmouseup', "return false;" );
	textarea.className = "pure-u-5-5 pure-input-rounded avitext";
	
	var text6 = document.createTextNode( "\n\n" );
	
	var button = document.createElement( 'button' );
	button.setAttribute( 'svelte-847749836', '' );
	function clickHandler ( event ) {
		component.add();
	}
	
	button.addEventListener( 'click', clickHandler, false );
	button.className = "pure-button pure-button-primary";
	
	button.appendChild( document.createTextNode( "Add to eBird CSV" ) );
	
	var text8 = document.createTextNode( "\n\n" );
	
	var button1 = document.createElement( 'button' );
	button1.setAttribute( 'svelte-847749836', '' );
	function clickHandler1 ( event ) {
		component.reset();
	}
	
	button1.addEventListener( 'click', clickHandler1, false );
	button1.className = "pure-button";
	
	button1.appendChild( document.createTextNode( "Start new CSV" ) );
	
	var text10 = document.createTextNode( "\n\n" );
	
	var ifBlock_anchor = document.createComment( "#if reports.length" );
	
	function getBlock ( root ) {
		if ( root.reports.length ) return renderIfBlock_0;
		return renderIfBlock_1;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );
	
	var text11 = document.createTextNode( "\n\n" );
	
	var eachBlock_anchor = document.createComment( "#each reports" );
	
	var eachBlock_value = root.reports;
	var eachBlock_iterations = [];
	
	
	for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
		eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
		
	}

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( h1, anchor );
			
			target.insertBefore( text1, anchor );
			
			target.insertBefore( p, anchor );
			
			target.insertBefore( text5, anchor );
			
			target.insertBefore( textarea, anchor );
			
			target.insertBefore( text6, anchor );
			
			target.insertBefore( button, anchor );
			
			target.insertBefore( text8, anchor );
			
			target.insertBefore( button1, anchor );
			
			target.insertBefore( text10, anchor );
			
			target.insertBefore( ifBlock_anchor, anchor );
			
			if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
			
			target.insertBefore( text11, anchor );
			
			target.insertBefore( eachBlock_anchor, anchor );
			
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
			
			for ( var i = eachBlock_value.length; i < eachBlock_iterations.length; i += 1 ) {
				eachBlock_iterations[i].teardown( true );
			}
			
			eachBlock_iterations.length = eachBlock_value.length;
		},

		teardown: function ( detach ) {
			textarea.removeEventListener( 'change', textareaChangeHandler, false );
			
			button.removeEventListener( 'click', clickHandler, false );
			
			button1.removeEventListener( 'click', clickHandler1, false );
			
			if ( ifBlock ) ifBlock.teardown( detach );
			
			for ( var i = 0; i < eachBlock_iterations.length; i += 1 ) {
				eachBlock_iterations[i].teardown( detach );
			}
			
			if ( detach ) {
				h1.parentNode.removeChild( h1 );
				
				text1.parentNode.removeChild( text1 );
				
				p.parentNode.removeChild( p );
				
				text5.parentNode.removeChild( text5 );
				
				textarea.parentNode.removeChild( textarea );
				
				text6.parentNode.removeChild( text6 );
				
				button.parentNode.removeChild( button );
				
				text8.parentNode.removeChild( text8 );
				
				button1.parentNode.removeChild( button1 );
				
				text10.parentNode.removeChild( text10 );
				
				ifBlock_anchor.parentNode.removeChild( ifBlock_anchor );
				
				text11.parentNode.removeChild( text11 );
				
				eachBlock_anchor.parentNode.removeChild( eachBlock_anchor );
			}
		}
	};
}

function renderEachBlock ( root, eachBlock_value, report, index, component ) {
	var hr = document.createElement( 'hr' );
	hr.setAttribute( 'svelte-847749836', '' );
	
	var text = document.createTextNode( "\n    " );
	
	var table = document.createElement( 'table' );
	table.setAttribute( 'svelte-847749836', '' );
	table.className = "pure-table";
	table.setAttribute( 'sortable', true );
	
	var caption = document.createElement( 'caption' );
	
	table.appendChild( caption );
	
	caption.appendChild( document.createTextNode( "Checklist on " ) );
	
	var text2 = document.createTextNode( report.checklist.date.emit() );
	
	caption.appendChild( text2 );
	
	caption.appendChild( document.createTextNode( " at " ) );
	
	var text4 = document.createTextNode( report.checklist.location.emit() );
	
	caption.appendChild( text4 );
	
	caption.appendChild( document.createTextNode( "\n            " ) );
	
	var a = document.createElement( 'a' );
	a.href = "#";
	function clickHandler ( event ) {
		var eachBlock_value = this.__svelte.eachBlock_value, index = this.__svelte.index, report = eachBlock_value[index]
		
		component.remove(index);
	}
	
	a.addEventListener( 'click', clickHandler, false );
	a.__svelte = {
		eachBlock_value: eachBlock_value,
		index: index
	};
	
	caption.appendChild( a );
	
	a.appendChild( document.createTextNode( "[x Remove]" ) );
	
	table.appendChild( document.createTextNode( "\n        " ) );
	
	var thead = document.createElement( 'thead' );
	
	table.appendChild( thead );
	
	var tr = document.createElement( 'tr' );
	
	thead.appendChild( tr );
	
	var th = document.createElement( 'th' );
	
	tr.appendChild( th );
	
	th.appendChild( document.createTextNode( "Identifier" ) );
	
	var th1 = document.createElement( 'th' );
	
	tr.appendChild( th1 );
	
	th1.appendChild( document.createTextNode( "Common Name" ) );
	
	var th2 = document.createElement( 'th' );
	
	tr.appendChild( th2 );
	
	th2.appendChild( document.createTextNode( "Total Count" ) );
	
	var th3 = document.createElement( 'th' );
	
	tr.appendChild( th3 );
	
	th3.appendChild( document.createTextNode( "Comments" ) );
	
	table.appendChild( document.createTextNode( "\n        " ) );
	
	var tbody = document.createElement( 'tbody' );
	
	table.appendChild( tbody );
	
	var eachBlock1_anchor = document.createComment( "#each report.checklist.species" );
	
	tbody.appendChild( eachBlock1_anchor );
	
	var eachBlock1_value = report.checklist.species;
	var eachBlock1_iterations = [];
	
	
	for ( var i = 0; i < eachBlock1_value.length; i += 1 ) {
		eachBlock1_iterations[i] = renderEachBlock1( root, eachBlock_value, report, index, eachBlock1_value, eachBlock1_value[i], i, component );
		eachBlock1_iterations[i].mount( eachBlock1_anchor.parentNode, eachBlock1_anchor );
	}

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( hr, anchor );
			
			target.insertBefore( text, anchor );
			
			target.insertBefore( table, anchor );
		},

		update: function ( changed, root, eachBlock_value, report, index ) {
			var report = eachBlock_value[index];
			
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
			
			for ( var i = eachBlock1_value.length; i < eachBlock1_iterations.length; i += 1 ) {
				eachBlock1_iterations[i].teardown( true );
			}
			
			eachBlock1_iterations.length = eachBlock1_value.length;
		},

		teardown: function ( detach ) {
			a.removeEventListener( 'click', clickHandler, false );
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			for ( var i = 0; i < eachBlock1_iterations.length; i += 1 ) {
				eachBlock1_iterations[i].teardown( false );
			}
			
			if ( detach ) {
				hr.parentNode.removeChild( hr );
				
				text.parentNode.removeChild( text );
				
				table.parentNode.removeChild( table );
			}
		}
	};
}

function renderEachBlock1 ( root, eachBlock_value, report, index, eachBlock1_value, taxon, taxon__index, component ) {
	var tr = document.createElement( 'tr' );
	
	var td = document.createElement( 'td' );
	
	tr.appendChild( td );
	
	var text = document.createTextNode( taxon.identifier.emit() );
	
	td.appendChild( text );
	
	tr.appendChild( document.createTextNode( "\n                " ) );
	
	var td1 = document.createElement( 'td' );
	
	tr.appendChild( td1 );
	
	var text2 = document.createTextNode( taxon.commonName.emit() );
	
	td1.appendChild( text2 );
	
	tr.appendChild( document.createTextNode( "\n                " ) );
	
	var td2 = document.createElement( 'td' );
	
	tr.appendChild( td2 );
	
	var text4 = document.createTextNode( template.helpers.calculateTotal(taxon.phenotype) );
	
	td2.appendChild( text4 );
	
	tr.appendChild( document.createTextNode( "\n                " ) );
	
	var td3 = document.createElement( 'td' );
	
	tr.appendChild( td3 );
	
	var text6 = document.createTextNode( taxon.comment.emit() );
	
	td3.appendChild( text6 );

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( tr, anchor );
		},

		update: function ( changed, root, eachBlock_value, report, index, eachBlock1_value, taxon, taxon__index ) {
			var report = eachBlock_value[index];
			var taxon = eachBlock1_value[taxon__index];
			
			text.data = taxon.identifier.emit();
			
			text2.data = taxon.commonName.emit();
			
			text4.data = template.helpers.calculateTotal(taxon.phenotype);
			
			text6.data = taxon.comment.emit();
		},

		teardown: function ( detach ) {
			if ( detach ) {
				tr.parentNode.removeChild( tr );
			}
		}
	};
}

function renderIfBlock_1 ( root, component ) {
	var div = document.createElement( 'div' );
	div.setAttribute( 'svelte-847749836', '' );
	div.className = "pure-button pure-button-disabled";
	
	div.appendChild( document.createTextNode( "Download Full CSV" ) );

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( div, anchor );
		},

		update: function ( changed, root ) {
			
		},

		teardown: function ( detach ) {
			if ( detach ) {
				div.parentNode.removeChild( div );
			}
		}
	};
}

function renderIfBlock_0 ( root, component ) {
	var a = document.createElement( 'a' );
	a.setAttribute( 'svelte-847749836', '' );
	a.href = "data:text/csv;charset=utf-8," + ( root.csvString );
	a.setAttribute( 'taget', "_blank" );
	a.className = "pure-button";
	a.download = "ebird-import.csv";
	
	a.appendChild( document.createTextNode( "Download Full CSV (" ) );
	
	var text1 = document.createTextNode( root.reports.length );
	
	a.appendChild( text1 );
	
	a.appendChild( document.createTextNode( " checklist" ) );
	
	var text3 = document.createTextNode( root.reports.length === 1 ? '' : 's' );
	
	a.appendChild( text3 );
	
	a.appendChild( document.createTextNode( ")" ) );

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( a, anchor );
		},

		update: function ( changed, root ) {
			a.href = "data:text/csv;charset=utf-8," + ( root.csvString );
			
			text1.data = root.reports.length;
			
			text3.data = root.reports.length === 1 ? '' : 's';
		},

		teardown: function ( detach ) {
			if ( detach ) {
				a.parentNode.removeChild( a );
			}
		}
	};
}

function Main ( options ) {
	options = options || {};

	var component = this;
	var state = Object.assign( template.data(), options.data );

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
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

	this.fire = function fire ( eventName, data ) {
		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) return;

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this, data );
		}
	};

	this.get = function get ( key ) {
		return key ? state[ key ] : state;
	};

	this.set = function set ( newState ) {
		var oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) mainFragment.update( newState, state );
		dispatchObservers( observers.deferred, newState, oldState );
	};

	this._mount = function mount ( target, anchor ) {
		mainFragment.mount( target, anchor );
	}

	this.observe = function ( key, callback, options ) {
		var group = ( options && options.defer ) ? observers.deferred : observers.immediate;

		( group[ key ] || ( group[ key ] = [] ) ).push( callback );

		if ( !options || options.init !== false ) {
			callback.__calling = true;
			callback.call( component, state[ key ] );
			callback.__calling = false;
		}

		return {
			cancel: function () {
				var index = group[ key ].indexOf( callback );
				if ( ~index ) group[ key ].splice( index, 1 );
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		var handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				var index = handlers.indexOf( handler );
				if ( ~index ) handlers.splice( index, 1 );
			}
		};
	};

	this.teardown = function teardown ( detach ) {
		this.fire( 'teardown' );

		mainFragment.teardown( detach !== false );
		mainFragment = null;

		state = {};
	};

	this.root = options.root;
	this.yield = options.yield;

	if ( !addedCss ) addCss();
	
	var mainFragment = renderMainFragment( state, this );
	if ( options.target ) this._mount( options.target );
}

Main.prototype = template.methods;

return Main;

}());