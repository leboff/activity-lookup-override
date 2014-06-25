<script>
	/* the first part of the lookup string */
	var lookupStringStart = '/_ui/common/data/LookupPage?lkfm=editPage&lknm=CF00NE0000005RWDW&lkfield=00NE0000005RWDW&lkent=001&lktp=003&dplp=%5B%22';

	var lookupStringEnd = '%22%2Cnull%5D&lksrch=';

	var originalLookupString;

	/* the field on the account object we are using in our override */
	var fieldId = 'CF00NE0000005RWDW';


	/*hook into the initialization of the whowhat fields*/
	if(ActivityFunction){
		/* store the original function so we can run it later */
		var originalWhoWhatFields = ActivityFunction.initWhoWhatFields;
			ActivityFunction.initWhoWhatFields = function() { 
			/*if it exists run it and initialize whobtn*/
			if(originalWhoWhatFields){
				originalWhoWhatFields.apply(this, arguments);
			}

			/* we know whobtn is initialized now, so lets override it with our send() function */
			var whoBtn = document.getElementById("whobtn");

			if(whoBtn){
				 originalLookupString = whoBtn.getAttribute('href');
				 whoBtn.setAttribute('href', '#_');
				 whoBtn.setAttribute('onclick', 'send()');
			}
		};
	}

	function send(){
		/* check that we have an account object filled in */
		var isAccount = document.getElementById('tsk3_lktp').getAttribute('value') === '001';
		var accountId = document.getElementById('tsk3_lkid').getAttribute('value');
		/* if the object is an account, and the accountid has a value, override openLookup with account field url */
		if(isAccount && accountId){
			openLookup(lookupStringStart + accountId + lookupStringEnd, 670);
		}
		else{
			eval(unescape(originalLookupString));
		}
	}
	
	
	
	/* override the lookup assignment back to the original page*/
	var originalLookupPick2 = lookupPick2;
    lookupPick2 = function() {
        if(arguments[2] == fieldId){
        	arguments[1] = 'tsk2_lkid';
        	arguments[2] = 'tsk2';
        	arguments[6] = '';
        	arguments[8] = '000000000000000';
        	console.log('override');
    	}
    	else{
    		console.log('passthrough');
    	}
    	originalLookupPick2.apply(this, arguments);

    }
</script>
