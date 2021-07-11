function updateContactFieldsInViewMode() {
	var contactItems = document.getElementsByClassName("DRlHd");
	console.log(contactItems);
	for(var i = 0; i < contactItems.length; i++) {
		//custom_field = contactItems[i].getElementsByClassName("JuD4Cc VKOTgd")[0];
		//console.log(contactItems[i]);
		if (contactItems[i].getElementsByClassName("VKOTgd")[0].children[1].textContent == "  • net.maxstuff.social-google-contacts.mcjava") {
			contactItems[i].getElementsByClassName("VKOTgd")[0].children[0].textContent = "asdf";
		}
	}
}
//document.onload = setTimeout(updateContactFieldsInViewMode(),5000);