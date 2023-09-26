# encrypting credentials in server controllers

in password controller in server directory , whenever you change anything in encryptCredentials or
decryptCredentials make sure to delete the password collection from the database in mongo atlas and
restart the server , otherwise it will throw bad decrypt error