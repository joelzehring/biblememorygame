
        /* --- Quiz Variables --- */
        var level = 0;
        var masterVerse = [];
        var targetWord = masterVerse[level];
        var wrongWords = [];

        /* --- Interface --- */
        function bibleApiTest() {
            var searchVerse = document.getElementById("myTextArea").value;
            searchVerse = searchVerse.replace(" ", "%20");
            searchVerse = searchVerse.replace(":", "%3A");
            var data = JSON.stringify(false);

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = false;

            xhr.addEventListener("readystatechange", function () {
              if (this.readyState === this.DONE) {
                  const {data} = JSON.parse(this.responseText);
                  showSearch(data.passages[0].id);
                  //pickVerse(data.content + data.reference);//
              }
            });

            xhr.open("GET", "https://api.scripture.api.bible/v1/bibles/9879dbb7cfe39e4d-01/search?query=" + searchVerse);
            xhr.setRequestHeader('api-key', apiKey);

            xhr.send(data);
        }

        function showSearch(i) {
            var data = JSON.stringify(false);

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = false;

            xhr.addEventListener("readystatechange", function () {
              if (this.readyState === this.DONE) {
                  const {data} = JSON.parse(this.responseText);
                  pickVerse(data.content + " " + data.reference);
              }
            });

            xhr.open("GET", "https://api.scripture.api.bible/v1/bibles/9879dbb7cfe39e4d-01/verses/" + i + "?content-type=text&include-verse-spans=false");
            xhr.setRequestHeader('api-key', apiKey);

            xhr.send(data);
        }

        function pickVerse(i) { // Once the user selects a verse, this function hides the verse option screen, turns the verse into an array, and sends the array to the display function. //
            enteredVerse = i;
            masterVerse = enteredVerse.split(" "); // Global Variables //
            displayVerse = masterVerse;
            document.getElementById("versePick").style.display = "none";
            buildPracticeDisplayVerse(displayVerse);
        }

        function versify() {
            let enteredVerse = document.getElementById("myTextArea").value;
            masterVerse = enteredVerse.split(" "); // Global Variables //
            displayVerse = masterVerse;
            document.getElementById("versePick").style.display = "none";
            buildPracticeDisplayVerse(displayVerse);
        }

        function showPicker() { //Redisplays the verse options //
            document.getElementById("versePick").style.display = "block";
        }
        
        function modeToggle() {  // Toggle between practice and quiz //
            var btn = document.getElementById("modeToggleBtn");
            if (btn.innerHTML == "Start Quiz") {
                btn.innerHTML = "Back to Practice";
            }
                else {
                    btn.innerHTML = "Start Quiz";
                }
        }
        
        /* --- End Interface --- */

        /* --- Practice --- */
        function buildPracticeDisplayVerse(array) { /* Show the entire verse to the user */
            var disp = document.getElementById("displayVerse");
            disp.innerHTML = "";
            for (var i = 0; i < array.length; i++) {
                var word = array[i];
                array[i] = "<span id='dispWord" + i + "' onclick='blackOut(this.id)'" + " style='border: 1px solid white; border-radius: 4px;';>" + word + "</span>";
            }
            disp.innerHTML = "";
            disp.innerHTML = array.join(" ");
        }

        function blackOut(id) {
            if (document.getElementById(id).style.color !== "white") {
                document.getElementById(id).style.color = "white";
                document.getElementById(id).style.background = "white";
                document.getElementById(id).style.border = "1px solid black";
                document.getElementById(id).style.boxShadow = "2px 1px 1px 1px gray;"
            }
                else {
                    document.getElementById(id).style.color = "black";
                    document.getElementById(id).style.background = "white";
                    document.getElementById(id).style.border = "1px solid white";
                    document.getElementById(id).style.boxShadow = "none";
                }
        }

        function showAll() {
            var words = document.getElementsByTagName("span");
            for (var i = 0; i < masterVerse.length; i++) {
                words[i].style.background = "white";
                words[i].style.color = "black";
                words[i].style.border = "1px solid white";
            }
        }

        function blackOutAll() {
            var words = document.getElementsByTagName("span");
            for (var i = 0; i < masterVerse.length; i++) {
                words[i].style.background = "none";
                words[i].style.color = "white";
                words[i].style.border = "1px solid black";
            }
        }
        /* --- End Practice --- */

        /* --- Quiz --- */

        function checkAnswer(x) { /* Check answer */
            var response = document.getElementById(x).innerHTML;
            if (response == targetWord) {
                document.getElementById("feedback").innerHTML = "You're right!";
            }
                else {
                    document.getElementById("feedback").innerHTML = "Try again.";
                }
        }

        /* --- End Quiz --- */