  
const playerTitle = document.querySelector(".playerTitle");
const rematchBtn = document.querySelector(".rematch");
const nodes = document.querySelectorAll(".inner");
const nodestab = Array.from(nodes);
let tab = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let Player = "X";
  function init() {
    nodes.forEach((item) =>
      item.addEventListener("click", (e) => {
        const indice = nodestab.indexOf(e.target);
        if (
          nodes[indice].classList.contains("X") ||
          nodes[indice].classList.contains("O")
        ) {
          return;
        }
  
        nodes[indice].classList.add("X");
        const effaceindice  = tab.indexOf(indice + 1);
        tab.splice(effaceindice, 1);

        if (testerLegain("X", nodes)) {
          playerTitle.innerHTML = "joueur X gagne";
          document.body.classList.add("over");
          return;
        }
  
        if (tab.length === 0) {
          playerTitle.innerHTML = "Svp Rejouer une autre fois";
          document.body.classList.add("over");
          console.log("ya Rien");
          return;
        }
  
        console.log("computer move");
        const random = Math.floor(Math.random() * tab.length);
        const computerIndex = tab[random];
        nodes[computerIndex - 1].classList.add("O");
  
        tab.splice(random, 1);

        if (testerLegain("O", nodes)) {
          playerTitle.innerHTML = "pc gagne";
          document.body.classList.add("over");
          return;
        }
      })
    );
  
    rematchBtn.addEventListener("click", () => {
      location.reload();
    });
  }
  

  function testerLegain(player, nodes) {
    function tester(pos1, pos2, pos3) {
      console.log(nodes);
      if (
        nodes[pos1].classList.contains(player) &
        nodes[pos2].classList.contains(player) &
        nodes[pos3].classList.contains(player)
      ) {
        return true;
      } else {
        return false;
      }
    }
  
    if (tester(0, 3, 6)) return true;
    else if (tester(1, 4, 7)) return true;
    else if (tester(2, 5, 8)) return true;
    else if (tester(0, 1, 2)) return true;
    else if (tester(3, 4, 5)) return true;
    else if (tester(6, 7, 8)) return true;
    else if (tester(0, 4, 8)) return true;
    else if (tester(2, 4, 6)) return true;
  }
  
init();
  