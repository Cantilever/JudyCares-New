<?php

/*
=========================================================================
 Copyright (c) 2011 Mark Bowen Design
=========================================================================
 File: pi.scm_access.php V2.0
-------------------------------------------------------------------------
 Purpose:	Allow access if an item has been purchased by a member using
 			the Simple Commerce Module.
=========================================================================
CHANGE LOG :

28th March 2011
	- Version 2.0
	- Conversion to 2.x code
=========================================================================
*/


$plugin_info = array(
						'pi_name'			=> 'SCM Access',
						'pi_version'		=> '2.0',
						'pi_author'			=> 'Mark Bowen',
						'pi_author_url'		=> 'http://www.markbowendesign.com/',
						'pi_description'	=> 'Allow access if an item has been purchased by a member using the Simple Commerce Module.',
						'pi_usage'			=> Scm_access::usage()
					);


class Scm_access {

    var $return_data = "";

    function Scm_access()
    {
		$this->EE =& get_instance();
		$tagdata = $this->EE->TMPL->tagdata;
		$member_id = $this->EE->session->userdata['member_id'];
		$entry_id = $this->EE->TMPL->fetch_param('entry_id');

		// We'll use this array to store variables that we'll allow
		// to be parsed as conditionals
		$conds = array();


		//	Perform the SQL query
			$query = $this->EE->db->query("SELECT purchase_id
								FROM exp_simple_commerce_purchases
								LEFT JOIN
								exp_simple_commerce_items
								ON exp_simple_commerce_purchases.item_id = exp_simple_commerce_items.item_id
								WHERE exp_simple_commerce_purchases.member_id = '$member_id' AND exp_simple_commerce_items.entry_id = '$entry_id'");

			if ($query->num_rows() == 0)
			{
			$conds['no_access'] = TRUE;
			}
			else
			{
				$conds['no_access'] = FALSE;
			}			
			
			// Prep the output using EE's conditional voodoo
			$tagdata = $this->EE->functions->prep_conditionals($tagdata, $conds);
	
			// Spit it out
			$this->return_data = $tagdata;

}

// END



// ----------------------------------------
//  Plugin Usage
// ----------------------------------------

// This function describes how the plugin is used.
// Make sure and use output buffering

function usage()
{
ob_start();
?>

A nice easy one this one!

{exp:channel:entries channel="default_site" limit="1"}

{exp:scm_access entry_id="{entry_id}"}

{if no_access}
<p>No results here = no_access</p>
{if:else}
<p>This shows if you do own the entry</p>
{/if}

{/exp:scm_access}

{/exp:channel:entries}



<?php
$buffer = ob_get_contents();

ob_end_clean();

return $buffer;
}
// END


}
// END CLASS
?>