		<?php
				// include
				include '../secret/secret.php';

				// Variables
				$nom = strip_tags($_POST['nom']);
				$email = strip_tags($_POST['email']);
				$telephone = strip_tags($_POST['telephone']);
				$message = strip_tags($_POST['message']);
				$checkRobot = strip_tags($_POST['checkRobot']);

				// text to send
				$texte = "Hi there !<br /><br />";
				$texte = $texte . "Tu as reçu un message depuis le site CV gaetantremois.fr.<br /><br />";
				$texte = $texte . "Les éléments renseignés dans le formulaire sont les suivants :<br /><br />";
				$texte = $texte . "Nom : $nom<br /><br />";
				$texte = $texte . "Email :  $email<br /><br />";
				$texte = $texte . "Téléphone : $telephone<br /><br />";
				$texte = $texte . "Message : $message<br /><br />";
				$texte = $texte . "Ceci est un message automatique, ne pas y répondre.";

				$texte = stripslashes($texte);

				// Dest and object message
				$destinataire = $dest;
				$objet = "Message depuis le formulaire du site gaetantremois.fr";

				//Headers
	      $headers = array(
	                      'Content-type' => 'text/html',
	                      'From' => $from,
	                      'X-Mailer' => 'PHP/' . phpversion()
	                  );

				// Send BDD
	      try {
					// Try connect bdd
	        $bdd = new PDO('mysql:host=localhost;dbname=' . $dbname, $login, $pass);
	        $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	      }
	      catch (Exception $e) { // Catch errors
	        die('Erreur : '.$e->getMessage());
	      }

				if ($checkRobot == 7) { // check here
		      $req = $bdd->prepare('INSERT INTO formulaire_cv_new (nom, email, telephone, message, postdate ) VALUES (:nom, :email, :telephone, :message, NOW())');
		      $req->execute(array('nom' => $nom,
		                          'email'=> $email,
		                          'telephone' => $telephone,
		                          'message'=> $message
		                          ));
		      $req->closeCursor();

					// Send message and return data to index.html
					$conf = ini_set('mail', 'mail.gmail.com');
					$send_ok = mail($destinataire, $objet, $texte, $headers);

					if ($send_ok) {
							echo "<b>Thank you for your message !<br /><br />I will get back to you very quickly.</b>";
						}
					else {
							echo "<b>There seems to be a mistake ...</b>";
						}
				}
