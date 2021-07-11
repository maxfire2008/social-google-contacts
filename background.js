chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.contentScriptQuery == "queryInstagramUsername") {
			var url = 'https://www.instagram.com/graphql/query/?query_hash=c9100bf9110dd6361671f113dd02e7d6&variables={%22user_id%22:%22'+request.userID+'%22,%22include_chaining%22:false,%22include_reel%22:true,%22include_suggested_users%22:false,%22include_logged_out_extras%22:false,%22include_highlight_reels%22:false,%22include_related_profiles%22:false}';
			fetch(url)
				.then(response => response.text())
				.then(text => JSON.parse(text))
				.then(jsonResponse => sendResponse(jsonResponse["data"]["user"]["reel"]["owner"]["username"]))
				//.then(text => console.log(text))
				.catch(error => console.log(error));
			return true;  // Will respond asynchronously.
		} else if (request.contentScriptQuery == "queryInstagramUserID") {
			var url = 'https://www.instagram.com/'+request.username+'/?__a=1';
			fetch(url)
				.then(response => response.text())
				.then(text => JSON.parse(text))
				.then(jsonResponse => {
					if (jsonResponse["graphql"]) {
						sendResponse(jsonResponse["graphql"]["user"]["id"]);
					} else {
						sendResponse(null);
					}
				})
				//.then(text => console.log(text))
				.catch(error => console.log(error));
			return true;  // Will respond asynchronously.
		}
	}
);