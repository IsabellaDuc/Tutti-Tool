<?php
/**
 * Plugin Name:       Tutti widget
 * Plugin URI:        https://github.com/IsabellaDuc/Tutti-widget
 * Description:       Un pannello di accessibilità gratuito: chi visita il sito regola testo, colori e animazioni da un bottone in un angolo. A free accessibility panel for your visitors.
 * Version:           0.4.0
 * Requires at least: 5.7
 * Requires PHP:      7.4
 * Author:            Isabella Ducros · Tutti prompti
 * Author URI:        https://tuttiprompti.it
 * License:           MIT
 * License URI:       https://opensource.org/licenses/MIT
 * Text Domain:       tutti-widget
 *
 * Mette il pannello (tutti-widget.js, in questa stessa cartella) come primo script
 * della testa di ogni pagina del sito, servito dal sito stesso: nessun servizio
 * esterno. Le scelte si fanno in Impostazioni → Tutti widget.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'TUTTI_WIDGET_VERSIONE', '0.4.0' );

/** Le impostazioni salvate, con i valori predefiniti. */
function tutti_widget_opzioni() {
	$predefinite = array(
		'posizione'     => 'destra',
		'contatto'      => '',
		'accento'       => '',
		'inchiostro'    => '',
		'dichiarazione' => '',
		'lingua'        => '',
	);
	// Fino alla 0.3 il plugin si chiamava Tutti Tool e salvava in «tutti_tool»:
	// se le impostazioni nuove non ci sono ancora, si leggono quelle di prima.
	$salvate = get_option( 'tutti_widget', null );
	if ( null === $salvate ) {
		$salvate = get_option( 'tutti_tool', array() );
	}
	return wp_parse_args( (array) $salvate, $predefinite );
}

/** Se è ancora attivo il plugin di prima (Tutti Tool), il pannello lo mette lui: niente doppioni. */
function tutti_widget_doppione() {
	return function_exists( 'tutti_tool_opzioni' );
}

add_action(
	'admin_notices',
	function () {
		if ( tutti_widget_doppione() && current_user_can( 'activate_plugins' ) ) {
			echo '<div class="notice notice-warning"><p>' . esc_html(
				0 === strpos( get_locale(), 'it' )
					? 'Tutti widget è il nuovo nome di Tutti Tool: disattiva ed elimina il plugin Tutti Tool. Le impostazioni passano da sole a Tutti widget.'
					: 'Tutti widget is the new name of Tutti Tool: deactivate and delete the Tutti Tool plugin. Your settings move to Tutti widget automatically.'
			) . '</p></div>';
		}
	}
);

/** Le parole della pagina delle impostazioni, in italiano o in inglese. */
function tutti_widget_testi() {
	$it = 0 === strpos( get_user_locale(), 'it' );
	return $it ? array(
		'menu'          => 'Tutti widget',
		'titolo'        => 'Tutti widget: il pannello di accessibilità',
		'intro'         => 'Il pannello è già attivo: sul sito compare un bottone rotondo in un angolo in basso. Qui puoi scegliere dove metterlo, l\'email per le segnalazioni e, se vuoi, i colori. Se non sei sicura o sicuro, lascia tutto com\'è.',
		'posizione'     => 'Angolo del bottone',
		'destra'        => 'In basso a destra',
		'sinistra'      => 'In basso a sinistra',
		'posizione_d'   => 'Scegli «a sinistra» se in basso a destra c\'è già qualcosa, per esempio una chat o il bottone per tornare su.',
		'contatto'      => 'Email per le segnalazioni',
		'contatto_d'    => 'Compare in fondo al pannello, per chi vuole segnalare un problema di accessibilità. Usa un\'email pubblica del sito.',
		'accento'       => 'Colore chiaro (facoltativo)',
		'accento_d'     => 'Un colore chiaro del sito, per il bottone e le scelte accese, scritto così: #F4EEA9. Vuoto = vaniglia.',
		'inchiostro'    => 'Colore scuro (facoltativo)',
		'inchiostro_d'  => 'Il colore del testo del sito, per le scritte del pannello, scritto così: #1C1D21. Vuoto = carbone.',
		'dichiarazione' => 'Dichiarazione di accessibilità (facoltativo)',
		'dichiarazione_d' => 'L\'indirizzo della pagina, solo se il sito ne ha una.',
		'lingua'        => 'Lingua del pannello',
		'auto'          => 'Come il sito',
		'contrasto'     => 'I due colori non si leggono bene insieme (contrasto %s:1, serve almeno 4,5:1): il pannello usa i colori predefiniti.',
		'colore_errato' => 'Un colore non è scritto bene: usa la forma #RRGGBB, per esempio #F4EEA9.',
		'impostazioni'  => 'Impostazioni',
		'nota'          => 'Il pannello aiuta chi legge, ma non rende il sito «conforme» alle norme sull\'accessibilità: per quello il sito va controllato e sistemato.',
		'privacy'       => 'Il pannello di accessibilità Tutti widget non usa cookie e non invia dati: le scelte di chi visita (per esempio la dimensione del testo) restano solo nel suo browser (localStorage).',
	) : array(
		'menu'          => 'Tutti widget',
		'titolo'        => 'Tutti widget: the accessibility panel',
		'intro'         => 'The panel is already active: a round button appears in a bottom corner of your site. Here you can choose where it goes, the email for feedback and, if you like, the colours. If unsure, leave everything as it is.',
		'posizione'     => 'Button corner',
		'destra'        => 'Bottom right',
		'sinistra'      => 'Bottom left',
		'posizione_d'   => 'Choose left if something already sits bottom right, such as a chat or a back-to-top button.',
		'contatto'      => 'Email for feedback',
		'contatto_d'    => 'Shown at the bottom of the panel, for visitors who want to report an accessibility problem. Use a public email of the site.',
		'accento'       => 'Light colour (optional)',
		'accento_d'     => 'A light colour of the site, for the button and active choices, written like this: #F4EEA9. Empty = vanilla.',
		'inchiostro'    => 'Dark colour (optional)',
		'inchiostro_d'  => 'The site\'s text colour, for the panel\'s text, written like this: #1C1D21. Empty = charcoal.',
		'dichiarazione' => 'Accessibility statement (optional)',
		'dichiarazione_d' => 'The page address, only if the site has one.',
		'lingua'        => 'Panel language',
		'auto'          => 'Same as the site',
		'contrasto'     => 'The two colours are hard to read together (contrast %s:1, at least 4.5:1 is needed): the panel uses the default colours.',
		'colore_errato' => 'A colour is not written correctly: use the #RRGGBB form, for example #F4EEA9.',
		'impostazioni'  => 'Settings',
		'nota'          => 'The panel helps people read, but it does not make the site "compliant" with accessibility rules: for that the site must be checked and fixed.',
		'privacy'       => 'The Tutti widget accessibility panel uses no cookies and sends no data: visitors\' choices (for example text size) stay in their own browser (localStorage).',
	);
}

/** Contrasto WCAG tra due colori #RRGGBB. */
function tutti_widget_contrasto( $a, $b ) {
	$lum = function ( $hex ) {
		$c = array_map( function ( $x ) {
			$x = hexdec( $x ) / 255;
			return $x <= 0.03928 ? $x / 12.92 : pow( ( $x + 0.055 ) / 1.055, 2.4 );
		}, str_split( ltrim( $hex, '#' ), 2 ) );
		return 0.2126 * $c[0] + 0.7152 * $c[1] + 0.0722 * $c[2];
	};
	$x = $lum( $a );
	$y = $lum( $b );
	return ( max( $x, $y ) + 0.05 ) / ( min( $x, $y ) + 0.05 );
}

/** Il pannello: il primo script della testa, prima di quelli del tema e dei plugin. */
add_action(
	'wp_head',
	function () {
		if ( tutti_widget_doppione() ) {
			return;
		}
		$o         = tutti_widget_opzioni();
		$attributi = array(
			'id'  => 'tutti-widget',
			'src' => add_query_arg( 'ver', TUTTI_WIDGET_VERSIONE, plugins_url( 'tutti-widget.js', __FILE__ ) ),
		);
		foreach ( array( 'lingua', 'posizione', 'contatto', 'accento', 'inchiostro', 'dichiarazione' ) as $k ) {
			if ( '' !== $o[ $k ] ) {
				$attributi[ 'data-' . $k ] = $o[ $k ];
			}
		}
		wp_print_script_tag( $attributi );
	},
	1
);

/** Pulizia e controllo di quello che arriva dalla pagina delle impostazioni. */
function tutti_widget_pulisci( $in ) {
	$t   = tutti_widget_testi();
	$in  = is_array( $in ) ? $in : array();
	$out = array(
		'posizione'     => ( isset( $in['posizione'] ) && 'sinistra' === $in['posizione'] ) ? 'sinistra' : 'destra',
		'contatto'      => isset( $in['contatto'] ) ? sanitize_email( $in['contatto'] ) : '',
		'dichiarazione' => isset( $in['dichiarazione'] ) ? esc_url_raw( trim( $in['dichiarazione'] ) ) : '',
		'lingua'        => ( isset( $in['lingua'] ) && in_array( $in['lingua'], array( 'it', 'en' ), true ) ) ? $in['lingua'] : '',
		'accento'       => '',
		'inchiostro'    => '',
	);
	foreach ( array( 'accento', 'inchiostro' ) as $k ) {
		$v = isset( $in[ $k ] ) ? trim( $in[ $k ] ) : '';
		if ( '' === $v ) {
			continue;
		}
		$v = sanitize_hex_color( '#' . ltrim( $v, '#' ) );
		if ( ! $v || 7 !== strlen( $v ) ) {
			add_settings_error( 'tutti_widget', 'tutti_widget_colore', $t['colore_errato'] );
			continue;
		}
		$out[ $k ] = strtoupper( $v );
	}
	// L'inchiostro deve leggersi sull'accento e sul bianco; se no, i colori predefiniti.
	$accento    = '' !== $out['accento'] ? $out['accento'] : '#F4EEA9';
	$inchiostro = '' !== $out['inchiostro'] ? $out['inchiostro'] : '#1C1D21';
	$minimo     = min( tutti_widget_contrasto( $inchiostro, $accento ), tutti_widget_contrasto( $inchiostro, '#FFFFFF' ) );
	if ( ( '' !== $out['accento'] || '' !== $out['inchiostro'] ) && $minimo < 4.5 ) {
		add_settings_error( 'tutti_widget', 'tutti_widget_contrasto', sprintf( $t['contrasto'], number_format_i18n( $minimo, 2 ) ) );
		$out['accento']    = '';
		$out['inchiostro'] = '';
	}
	return $out;
}

add_action(
	'admin_init',
	function () {
		register_setting(
			'tutti_widget',
			'tutti_widget',
			array(
				'type'              => 'array',
				'sanitize_callback' => 'tutti_widget_pulisci',
				'default'           => array(),
			)
		);
		if ( function_exists( 'wp_add_privacy_policy_content' ) ) {
			$t = tutti_widget_testi();
			wp_add_privacy_policy_content( 'Tutti widget', '<p>' . esc_html( $t['privacy'] ) . '</p>' );
		}
	}
);

add_action(
	'admin_menu',
	function () {
		$t = tutti_widget_testi();
		add_options_page( $t['titolo'], $t['menu'], 'manage_options', 'tutti-widget', 'tutti_widget_pagina' );
	}
);

/** Il link «Impostazioni» accanto al plugin, nella pagina dei plugin. */
add_filter(
	'plugin_action_links_' . plugin_basename( __FILE__ ),
	function ( $link ) {
		$t = tutti_widget_testi();
		array_unshift( $link, '<a href="' . esc_url( admin_url( 'options-general.php?page=tutti-widget' ) ) . '">' . esc_html( $t['impostazioni'] ) . '</a>' );
		return $link;
	}
);

/** La pagina Impostazioni → Tutti widget. */
function tutti_widget_pagina() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	$t = tutti_widget_testi();
	$o = tutti_widget_opzioni();
	$campo = function ( $k, $tipo, $segnaposto = '' ) use ( $t, $o ) {
		printf(
			'<tr><th scope="row"><label for="tutti-widget-%1$s">%2$s</label></th><td><input type="%3$s" id="tutti-widget-%1$s" name="tutti_widget[%1$s]" value="%4$s" placeholder="%5$s" class="regular-text" aria-describedby="tutti-widget-%1$s-d"><p class="description" id="tutti-widget-%1$s-d">%6$s</p></td></tr>',
			esc_attr( $k ),
			esc_html( $t[ $k ] ),
			esc_attr( $tipo ),
			esc_attr( $o[ $k ] ),
			esc_attr( $segnaposto ),
			esc_html( $t[ $k . '_d' ] )
		);
	};
	?>
	<div class="wrap">
		<h1><?php echo esc_html( $t['titolo'] ); ?></h1>
		<p><?php echo esc_html( $t['intro'] ); ?></p>
		<?php settings_errors( 'tutti_widget' ); ?>
		<form method="post" action="options.php">
			<?php settings_fields( 'tutti_widget' ); ?>
			<table class="form-table" role="presentation">
				<tr>
					<th scope="row"><?php echo esc_html( $t['posizione'] ); ?></th>
					<td>
						<fieldset aria-describedby="tutti-widget-posizione-d">
							<legend class="screen-reader-text"><?php echo esc_html( $t['posizione'] ); ?></legend>
							<label><input type="radio" name="tutti_widget[posizione]" value="destra" <?php checked( $o['posizione'], 'destra' ); ?>> <?php echo esc_html( $t['destra'] ); ?></label><br>
							<label><input type="radio" name="tutti_widget[posizione]" value="sinistra" <?php checked( $o['posizione'], 'sinistra' ); ?>> <?php echo esc_html( $t['sinistra'] ); ?></label>
						</fieldset>
						<p class="description" id="tutti-widget-posizione-d"><?php echo esc_html( $t['posizione_d'] ); ?></p>
					</td>
				</tr>
				<?php
				$campo( 'contatto', 'email', 'info@esempio.it' );
				$campo( 'accento', 'text', '#F4EEA9' );
				$campo( 'inchiostro', 'text', '#1C1D21' );
				$campo( 'dichiarazione', 'url', 'https://' );
				?>
				<tr>
					<th scope="row"><label for="tutti-widget-lingua"><?php echo esc_html( $t['lingua'] ); ?></label></th>
					<td>
						<select id="tutti-widget-lingua" name="tutti_widget[lingua]">
							<option value="" <?php selected( $o['lingua'], '' ); ?>><?php echo esc_html( $t['auto'] ); ?></option>
							<option value="it" <?php selected( $o['lingua'], 'it' ); ?>>Italiano</option>
							<option value="en" <?php selected( $o['lingua'], 'en' ); ?>>English</option>
						</select>
					</td>
				</tr>
			</table>
			<?php submit_button(); ?>
		</form>
		<p><?php echo esc_html( $t['nota'] ); ?></p>
	</div>
	<?php
}

/**
 * Svuota la cache delle pagine dei plugin di cache più diffusi, così il bottone
 * compare subito dopo l'attivazione o dopo un cambio di impostazioni (senza,
 * chi visita vedrebbe ancora le pagine di prima).
 */
function tutti_widget_svuota_cache() {
	if ( function_exists( 'wp_cache_clear_cache' ) ) {
		wp_cache_clear_cache(); // WP Super Cache.
	}
	if ( function_exists( 'w3tc_flush_all' ) ) {
		w3tc_flush_all(); // W3 Total Cache.
	}
	if ( function_exists( 'rocket_clean_domain' ) ) {
		rocket_clean_domain(); // WP Rocket.
	}
	if ( function_exists( 'sg_cachepress_purge_cache' ) ) {
		sg_cachepress_purge_cache(); // SiteGround Optimizer.
	}
	if ( class_exists( 'autoptimizeCache' ) && method_exists( 'autoptimizeCache', 'clearall' ) ) {
		autoptimizeCache::clearall(); // Autoptimize.
	}
	do_action( 'litespeed_purge_all' );                 // LiteSpeed Cache.
	do_action( 'wpfc_clear_all_cache' );                // WP Fastest Cache.
	do_action( 'cache_enabler_clear_complete_cache' );  // Cache Enabler.
	do_action( 'breeze_clear_all_cache' );              // Breeze.
	do_action( 'wphb_clear_page_cache' );               // Hummingbird.
}

/** All'attivazione: copia le impostazioni di Tutti Tool (se ci sono) e svuota la cache. */
function tutti_widget_attiva() {
	$prima = get_option( 'tutti_tool', null );
	if ( null !== $prima && null === get_option( 'tutti_widget', null ) ) {
		add_option( 'tutti_widget', $prima );
	}
	tutti_widget_svuota_cache();
}
register_activation_hook( __FILE__, 'tutti_widget_attiva' );
add_action( 'add_option_tutti_widget', 'tutti_widget_svuota_cache' );
add_action( 'update_option_tutti_widget', 'tutti_widget_svuota_cache' );

/** Alla disinstallazione si cancellano le impostazioni. */
function tutti_widget_disinstalla() {
	delete_option( 'tutti_widget' );
}
register_uninstall_hook( __FILE__, 'tutti_widget_disinstalla' );
