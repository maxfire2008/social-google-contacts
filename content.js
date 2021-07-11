function updateContactFieldsInViewMode() {
	var contactItems = document.getElementsByClassName("DRlHd");
	for(var i = 0; i < contactItems.length; i++) {
		//custom_field = contactItems[i].getElementsByClassName("JuD4Cc VKOTgd")[0];
		//console.log(contactItems[i]);
		if (contactItems.getElementsByClassName("VKOTgd")[0].children[1].textContent.split("• ")[1] == "net.maxstuff.social-google-contacts.mcjava") {
			contactItems.getElementsByClassName("VKOTgd")[0].children[0].textContent = "asdf";
		}
	}
}
document.onload = setTimeout(updateContactFieldsInViewMode(),5000);