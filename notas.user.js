// ==UserScript==
// @name         notas parciais
// @namespace    http://tampermonkey.net/
// @version      v0.2
// @description  try to take over the world!
// @author       Lucas Monteiro
// @match        http://sigeduca.seduc.mt.gov.br/ged/hwmlancaavaliacaonotahab.aspx?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gov.br
// @grant        none
// @updateURL    https://github.com/lksoumon/sigeducaLancamentos/raw/refs/heads/main/notas.user.js
// @downloadURL  https://github.com/lksoumon/sigeducaLancamentos/raw/refs/heads/main/notas.user.js

// ==/UserScript==
var carregado = ''; // variavél para verificar se os dados dos alunos foram carregados
var output = [];
var parcial = '4,04';
//estilo dos botões
var styleSCT = document.createElement('style');
styleSCT.type = 'text/css';
styleSCT.innerHTML = 'span.button-like{display:inline-block;padding:12px 24px;margin:10px;background-color:#065195;color:#fff;font-weight:bold;border:1px solid #065195;border-radius:4px;cursor:pointer;text-align:center;text-decoration:none}span.button-like:hover{background-color:#0056b3;border-color:#0056b3}';
document.getElementsByTagName('head')[0].appendChild(styleSCT);


           // CONFI('vGEDMATDISCAVAREF', v);

function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
}
function getTableData(tableElement) {
      var tableData = [];
      var rows = tableElement.rows;

      for (var i = 1; i < rows.length; i++) {
        var rowData = [];
        var cells = rows[i].cells;

        for (var j = 0; j < cells.length; j++) {
          rowData.push(cells[j].innerText);
        }

        tableData.push(rowData);
      }

      return tableData;
    }
function getSelectedValues(selectElement) {
      var selectedValues = [];
      var options = selectElement.options;

      for (var i = 0; i < options.length; i++) {
        if (i == 0) {

        }else{selectedValues.push(options[i].value);}
      }

      return selectedValues;
    }

function arrayToHtmlTable(dataArray) {
      // Abrir uma nova janela
      var novaJanela = window.open('', '_blank');

      // Criar o conteúdo HTML para a tabela
      var tabelaHTML = '<head><title>Comunicação de Transferência de Aluno</title></head><body><table border="1"><thead><tr>';
    tabelaHTML += '<h1>Comunicação de Transferência de Aluno</h1><p>Informamos que a transferência do aluno abaixo relacionado foi realizada fora do prazo estabelecido em portaria de 5 dias devido ao atraso no lançamento das notas da(s) seguinte(s) disciplina(s).</p>';
      // Adicionar cabeçalho da tabela
      if (dataArray.length > 1) {
        dataArray[0].forEach(function (coluna) {
          tabelaHTML += '<th>' + coluna + '</th>';
        });
        tabelaHTML += '</tr></thead><tbody>';

        // Adicionar linhas da tabela
        for (var i = 1; i < dataArray.length; i++) {
          tabelaHTML += '<tr>';
          dataArray[i].forEach(function (valor) {
            tabelaHTML += '<td>' + valor + '</td>';
          });
          tabelaHTML += '</tr>';
        }

        tabelaHTML += '</tbody></table></body>';

          tabelaHTML += '<p>Data: ___/___/_____</p><p>Ass. Secretário Escolar: ___________________________________</p><p>Ass. Coordenador Responsável: ___________________________________</p>';
        // Adicionar tabela ao conteúdo da nova janela
        novaJanela.document.write(tabelaHTML);
      } else {
        // Se a array estiver vazia, exibir uma mensagem na nova janela
        novaJanela.document.write('<p>Nenhum erro encontrado pelo script!</p>');
      }
    }
function stringToArray(string) {

        // Tenta fazer o parse da string como uma array JSON
        const str = string.replace(/'/g, '"');
        //console.log(str);
        const array = JSON.parse(str);
        //console.log(array);
        return array;

}


(function() {
    'use strict';
    var realConfirm=window.confirm;
    window.confirm=function(){
        window.confirm=realConfirm;
        return true;
    };
function addCopyBtn(ele,v) {
    //console.log('as');
        let btn = document.createElement("span");
        btn.innerHTML = "Lançar "+v+" bim";
        btn.className = "button-like";
        btn.onclick = () => {
            const eek = document.getElementById("vDISCIPLINAAREACOD");
            var selectedValues = getSelectedValues(eek);

            waitForNotificationHidden(v);

        }

        ele.insertBefore(btn, ele.firstChild);
    }
    var totalFaltas = 0;
    function addPCABtn(ele,v) {
    //console.log('as');
        let btn = document.createElement("span");
        btn.innerHTML = "Justificar "+v+" bim";
        btn.className = "button-like";
        btn.onclick = () => {
            const eek = document.getElementById("vDISCIPLINAAREACOD");
            var selectedValues = getSelectedValues(eek);
            totalFaltas = 0;
            waitForNotificationHidden3(v);

        }

        ele.insertBefore(btn, ele.firstChild);
    }

    // Função para verificar se o elemento gx_ajax_notification está oculto
    function isNotificationHidden() {
        var notification = document.getElementById('gx_ajax_notification');
        if (notification) {
            var displayStyle = window.getComputedStyle(notification).getPropertyValue('display');
            return displayStyle === 'none';
        }
        return false; // Retorna falso se o elemento não existir
    }

    // Função de pausa com Promessa
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }



    // Loop com pausas para aguardar a propriedade display do elemento gx_ajax_notification ser 'none'
    async function waitForNotificationHidden(bima) {
        var output = [['Nome - cod','turma','disciplina','lançou nota?','bimestre']];
        var bb = bima;
        const bim = document.getElementById("vGEDMATDISCAVAREF");
        var bimes = getSelectedValues(bim);
        console.log(bimes);
        //if(bimes.length == 1){bb = bimes[0];console.log(bimes[0]);}



        let element = document.getElementById('vGEDMATDISCAVAREF');
        element.value = bb;

        element.onchange();

            await sleep(400);

            while (!isNotificationHidden()) {
                //console.log("Aguardando ocultar...");
                await sleep(700); // Pausa por 1 segundo
            }


        const eek = document.getElementById("vDISCIPLINAAREACOD");

        var options = eek.options;

        var selectedValues = [];

        for (var k = 0; k < options.length; k++) {
             selectedValues.push(options[k].value);
        }


        //var selectedValues = getSelectedValues(eek);
//console.log(selectedValues);
        var iterations = selectedValues.length;
        for (var i = 0; i < iterations; i++) {
            console.log("Iteração", i );
            selectElement('vGEDMATDISCAVAREF', bb);
            selectElement('vDISCIPLINAAREACOD', selectedValues[i]);

            eek.onchange();

            await sleep(700);
            // Primeira pausa aguardando que o elemento gx_ajax_notification esteja oculto
            while (!isNotificationHidden()) {
                //console.log("Aguardando ocultar...");
                await sleep(700); // Pausa por 1 segundo
            }

           //console.log("Elemento gx_ajax_notification está oculto.");

            // Executa as ações após a primeira pausa -----------------------
            var precisa = 0;

            if(document.getElementById('W0135vGGEDCONSGL_0001')){
                if(document.getElementById('W0135vGGEDCONSGL_0001').value == ""){
                    let mudar = document.getElementById('W0135vGGEDCONSGL_0001');
                    mudar.value = "BAS";precisa = 1;
                    output.push([document.getElementById('span_W0135vEGEDALUNOM_0001').textContent.trim(),
                            document.getElementById("span_vGERTURSAL").textContent.trim(),
                            eek.options[eek.selectedIndex].text,
                            "Não",
                            bb+"º bimestre"]);
                }
            }
            //console.log(document.getElementById('W0135vGRIDGEDMATDISCAVANOTA_0001'));
            if(document.getElementById('W0135vGRIDGEDMATDISCAVANOTA_0001') ){

                if(document.getElementById('W0135vGRIDGEDMATDISCAVANOTA_0001').value=="0,00" && document.getElementById('span_W0135vTEMLANCAMENTO_0001').textContent.trim() != "Sim"){
                    //console.log(document.getElementById('W0135vGRIDGEDMATDISCAVANOTA_0001').value);
                    document.getElementById('W0135vGRIDGEDMATDISCAVANOTA_0001').value = parcial;precisa = 1;
                    output.push([document.getElementById('span_W0135vGRIDGEDALUCOD_0001').textContent.trim() + " - "+document.getElementById('span_W0135vGRIDGEDALUNOM_0001').textContent.trim(),
                            document.getElementById("span_vGERTURSAL").textContent.trim(),
                            eek.options[eek.selectedIndex].text,
                            "Não",
                            bb+"º bimestre"]);

                }

            }

            if (precisa == 0){ }

            if (precisa == 1){
                console.log("hitar conf");



                var realConfirm=window.confirm;
                window.confirm=function(){
                    window.confirm=realConfirm;
                    return true;
                };

                (function (){
                    document.getElementsByClassName("btnConfirmar")[0].click();
                })();
            }


            await sleep(500);

            // -----------------------------------------------------------------

            // Segunda pausa aguardando que o elemento gx_ajax_notification esteja oculto
            while (!isNotificationHidden()) {
                //console.log("Segunda pausa - Aguardando ocultar...");
                await sleep(1000); // Pausa por 2 segundos antes de avançar para a próxima iteração
            }
            //console.log("Segunda pausa - Elemento gx_ajax_notification está oculto.");

             // Executa as ações após a segunda pausa -----------------------



            // -----------------------------------------------------------------
        }

        //console.log("Fim do loop");
        arrayToHtmlTable(output);

    }



     //------------------------

    //------------------------
    const bim = document.getElementById("vGEDMATDISCAVAREF");
    var bimes = getSelectedValues(bim);

    for (var i = 0; i < bimes.length; i++) {
        addCopyBtn(document.getElementById("TABLE4"),bimes[i]);

    }

    for (var k = 0; k < bimes.length; k++) {
        addPCABtn(document.getElementById("TABLE4"),bimes[k]);

    }

    var ppp = document.getElementById("TABLE4");
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.id = 'myInputField';
    inputField.value = '4,04';
    inputField.placeholder = 'Digite algo...';

    ppp.insertBefore(inputField, ppp.firstChild);






    //--------------------------- agora para puxar manual as notas -------
    // Cria um elemento div para o menu flutuante
    var floatingMenu = document.createElement('div');
    floatingMenu.style.position = 'fixed';
    floatingMenu.style.bottom = '50%';
    floatingMenu.style.right = '0';
    floatingMenu.style.transform = 'translateY(50%)';
    floatingMenu.style.backgroundColor = '#fff';
    floatingMenu.style.padding = '10px';
    floatingMenu.style.border = '1px solid #ccc';
    floatingMenu.style.borderRadius = '5px';
    floatingMenu.style.zIndex = '9999';
    floatingMenu.setAttribute('id', 'floating-menu'); // Adiciona um ID ao menu

    // Cria o botão principal "Carimbo Digital"
    var mainButton = document.createElement('button');
    mainButton.textContent = 'Lançar notas manuais';
    mainButton.addEventListener('click', toggleSubMenu);
    floatingMenu.appendChild(mainButton);

    // Cria o submenu
    var subMenu = document.createElement('div');
    subMenu.style.display = 'none';
    subMenu.style.position = 'absolute';
    subMenu.style.top = '100%';
    subMenu.style.right = '0';
    subMenu.style.backgroundColor = '#fff';
    subMenu.style.border = '1px solid #ccc';
    subMenu.style.borderRadius = '5px';
    subMenu.style.padding = '5px';
    subMenu.style.zIndex = '9999';

    const textoNotas = document.createElement('input');
    textoNotas.type = 'text';
    textoNotas.id = 'texto-notas';
    //textoNotas.value = '4,04';
    textoNotas.placeholder = 'Copie aqui...';
    subMenu.appendChild(textoNotas);
    // Cria os cinco botões do submenu
    for (var z = 1; z <= 4; z++) {
        //console.log(z);
        let btn = document.createElement('span');
        btn.innerHTML = 'bimestre '+z;
        btn.className = "button-like";
        btn.valorBimestre = z;
        btn.onclick = () => {
            notaManual(btn.valorBimestre);
        }

        subMenu.appendChild(btn);

    }

    // Adiciona o submenu ao menu flutuante
    floatingMenu.appendChild(subMenu);

    // Adiciona o menu flutuante à página
    document.body.appendChild(floatingMenu);

    // Estilo para ocultar o menu durante a impressão
    var style = document.createElement('style');
    style.innerHTML = '@media print { #floating-menu { display: none !important; } }';
    document.head.appendChild(style);

    // Função para alternar a exibição do submenu
    function toggleSubMenu() {
        if (subMenu.style.display === 'none') {
            subMenu.style.display = 'block';
        } else {
            subMenu.style.display = 'none';
        }
    }


    function notaManual(b){
        var minhaString = document.getElementById('texto-notas').value;
        //console.log(minhaString);
        const minhaArray = stringToArray(minhaString);
        //console.log(minhaArray);
        waitForNotificationHidden2(b,minhaArray);



    }

    async function waitForNotificationHidden2(bima,arrayNotas) {
        var output = [['Nome - cod','turma','disciplina','lançou nota?','bimestre']];
        var bb = bima;
        const bim = document.getElementById("vGEDMATDISCAVAREF");
        var bimes = getSelectedValues(bim);
        //console.log(bimes);
        //if(bimes.length == 1){bb = bimes[0];console.log(bimes[0]);}



        let element = document.getElementById('vGEDMATDISCAVAREF');
        element.value = bb;
        console.log(bb);
        await sleep(300);
        element.onchange();

            await sleep(400);

            while (!isNotificationHidden()) {
                //console.log("Aguardando ocultar...");
                await sleep(700); // Pausa por 1 segundo
            }


        const eek = document.getElementById("vDISCIPLINAAREACOD");

        var options = eek.options;

        var selectedValues = [];

        for (var k = 0; k < options.length; k++) {
             selectedValues.push(options[k].value);
        }


        //var selectedValues = getSelectedValues(eek);
//console.log(selectedValues);
        var iterations = selectedValues.length;
        for (var i = 0; i < iterations; i++) {
            console.log("Iteração", i );
            selectElement('vGEDMATDISCAVAREF', bb);
            selectElement('vDISCIPLINAAREACOD', selectedValues[i]);

            var mateDisc = dropdownToObject(document.getElementById('vDISCIPLINAAREACOD'));
            //console.log(mateDisc);
            eek.onchange();

            await sleep(700);
            // Primeira pausa aguardando que o elemento gx_ajax_notification esteja oculto
            while (!isNotificationHidden()) {
                //console.log("Aguardando ocultar...");
                await sleep(700); // Pausa por 1 segundo
            }

           //console.log("Elemento gx_ajax_notification está oculto.");

            // Executa as ações após a primeira pausa -----------------------
            var precisa = 0;let notaAtual
            if(mateDisc[selectedValues[i]]){
                let materiaAtual = mateDisc[selectedValues[i]];
                notaAtual = arrayNotas[materiaAtual];
                if(notaAtual == undefined){
                    precisa = 0;
                }else{
                    precisa = 1;
                }
            console.log(materiaAtual,notaAtual);
            };





            if (precisa == 0){ }

            if (precisa == 1){


                if(document.getElementById('W0135vGGEDCONSGL_0001')){
                if(document.getElementById('W0135vGGEDCONSGL_0001').value == ""){
                    let mudar = document.getElementById('W0135vGGEDCONSGL_0001');
                    mudar.value = notaAtual;
                    output.push([document.getElementById('span_W0135vEGEDALUNOM_0001').textContent.trim(),
                            document.getElementById("span_vGERTURSAL").textContent.trim(),
                            eek.options[eek.selectedIndex].text,
                            "Não",
                            bb+"º bimestre"]);
                }
            }
            //console.log(document.getElementById('W0135vGRIDGEDMATDISCAVANOTA_0001'));
            if(document.getElementById('W0135vGRIDGEDMATDISCAVANOTA_0001') ){

                if(document.getElementById('W0135vGRIDGEDMATDISCAVANOTA_0001').value=="0,00" && document.getElementById('span_W0135vTEMLANCAMENTO_0001').textContent.trim() != "Sim"){
                    //console.log(document.getElementById('W0135vGRIDGEDMATDISCAVANOTA_0001').value);
                    if(notaAtual == "0,00"){notaAtual = "0,25";}
                    document.getElementById('W0135vGRIDGEDMATDISCAVANOTA_0001').value = notaAtual;
                    output.push([document.getElementById('span_W0135vGRIDGEDALUCOD_0001').textContent.trim() + " - "+document.getElementById('span_W0135vGRIDGEDALUNOM_0001').textContent.trim(),
                            document.getElementById("span_vGERTURSAL").textContent.trim(),
                            eek.options[eek.selectedIndex].text,
                            "Não",
                            bb+"º bimestre"]);

                }

            }




                console.log("hitar conf");



                var realConfirm=window.confirm;
                window.confirm=function(){
                    window.confirm=realConfirm;
                    return true;
                };

                (function (){
                    document.getElementsByClassName("btnConfirmar")[0].click();
                })();
            }


            await sleep(500);

            // -----------------------------------------------------------------

            // Segunda pausa aguardando que o elemento gx_ajax_notification esteja oculto
            while (!isNotificationHidden()) {
                //console.log("Segunda pausa - Aguardando ocultar...");
                await sleep(1000); // Pausa por 2 segundos antes de avançar para a próxima iteração
            }
            //console.log("Segunda pausa - Elemento gx_ajax_notification está oculto.");

             // Executa as ações após a segunda pausa -----------------------



            // -----------------------------------------------------------------
        }

        //console.log("Fim do loop");
        arrayToHtmlTable(output);
    }

    function dropdownToObject(selectElement) {
        const options = selectElement.options;
        const result = {};

        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            let text = option.innerText;
            text = text.replace(option.value+" - ", "");
            result[option.value] = text;
        }

        return result;
    }



    // AGORA PARA LANÇAR PCA

    async function waitForNotificationHidden3(bima) {
        var output = [['Nome - cod','turma','disciplina','lançou nota?','bimestre']];
        var bb = bima;
        var totalFaltas = 0;
        const bim = document.getElementById("vGEDMATDISCAVAREF");
        var bimes = getSelectedValues(bim);
        //console.log(bimes);
        //if(bimes.length == 1){bb = bimes[0];console.log(bimes[0]);}



        let element = document.getElementById('vGEDMATDISCAVAREF');
        element.value = bb;
        console.log(bb);
        await sleep(300);
        element.onchange();

            await sleep(400);

            while (!isNotificationHidden()) {
                //console.log("Aguardando ocultar...");
                await sleep(700); // Pausa por 1 segundo
            }


        const eek = document.getElementById("vDISCIPLINAAREACOD");

        var options = eek.options;

        var selectedValues = [];

        for (var k = 0; k < options.length; k++) {
             selectedValues.push(options[k].value);
        }


        //var selectedValues = getSelectedValues(eek);
//console.log(selectedValues);
        var iterations = selectedValues.length;
        for (var i = 0; i < iterations; i++) {
            console.log("Iteração", i );
            selectElement('vGEDMATDISCAVAREF', bb);
            selectElement('vDISCIPLINAAREACOD', selectedValues[i]);

            var mateDisc = dropdownToObject(document.getElementById('vDISCIPLINAAREACOD'));
            //console.log(mateDisc);
            eek.onchange();

            await sleep(700);
            // Primeira pausa aguardando que o elemento gx_ajax_notification esteja oculto
            while (!isNotificationHidden()) {
                //console.log("Aguardando ocultar...");
                await sleep(700); // Pausa por 1 segundo
            }

           //console.log("Elemento gx_ajax_notification está oculto.");

            // Executa as ações após a primeira pausa -----------------------
            var precisa = 0;

            if(document.getElementById("vDISCIPLINAAREACOD").value != 0){
                precisa = 1;
            }
            let qtdeFaltas;
            let qtdeJust;


            //console.log(materiaAtual,notaAtual);






            if (precisa == 0){ }

            if (precisa == 1){

                var realConfirm;
            if(document.getElementById('W0135vGGEDCONSGL_0001')){
                //if(document.getElementById('W0135vGGEDCONSGL_0001').value == ""){

                qtdeFaltas = document.getElementById("W0135vGGEDMATDISCAVAQTDFLT_0001").value;
                qtdeJust =document.getElementById("W0135vGGEDMATDISCAVAFLTJUSTIFICADAS_0001").value;
                totalFaltas = totalFaltas+ parseInt(qtdeFaltas);
                output.push([document.getElementById('span_W0135vEGEDALUNOM_0001').textContent.trim(),
                            document.getElementById("span_vGERTURSAL").textContent.trim(),
                            eek.options[eek.selectedIndex].text,
                            qtdeJust+" faltas justificadas",
                            bb+"º bimestre"]);

                if(qtdeJust != qtdeFaltas){
                    //let mudar = document.getElementById('W0135vGGEDCONSGL_0001');
                    document.getElementById("W0135vGGEDMATDISCAVAFLTJUSTIFICADAS_0001").value = parseInt(qtdeFaltas);

                   

                    console.log("hitar conf");

                    realConfirm=window.confirm;
                    window.confirm=function(){
                        window.confirm=realConfirm;
                        return true;
                    };

                    (function (){
                        document.getElementsByClassName("btnConfirmar")[0].click();
                    })();

                }
            }

            //console.log(document.getElementById('W0135vGRIDGEDMATDISCAVANOTA_0001'));
            if(document.getElementById('W0135vGRIDGEDMATDISCAVANOTA_0001') ){

                qtdeFaltas = document.getElementById("W0135vGRIDGEDMATDISCAVAQTDFLT_0001").value;
                qtdeJust =document.getElementById("W0135vGRIDGEDMATDISCAVAFLTJUST_0001").value;
                totalFaltas = totalFaltas+ parseInt(qtdeFaltas);
                output.push([document.getElementById('span_W0135vGRIDGEDALUCOD_0001').textContent.trim() + " - "+document.getElementById('span_W0135vGRIDGEDALUNOM_0001').textContent.trim(),
                            document.getElementById("span_vGERTURSAL").textContent.trim(),
                            eek.options[eek.selectedIndex].text,
                            qtdeFaltas+" faltas justificadas",
                            bb+"º bimestre"]);

                if(qtdeJust != qtdeFaltas){
                    document.getElementById("W0135vGEDJUSDSC").value = "Aluno fez PCA";
                    //document.getElementById("W0135vGEDJUSDSC").value = 'A compensação de ausência é assegurada no Constituição Federal nos artigos 205° e 208°, no Estatuto da Criança e do Adolescente, Lei n° 8.069/90, nos artigos 53°, 54°, 55° e 56°, na LDB, Lei n° 9.394/96, nos artigos 5°, 12°, 13° e 24°, e nas Portarias 347/2019/GS/SEDUC/MT. E reafirmada pela Portaria nº 337/2024/GS/SEDUC/MT sobre o enfrentamento do abandono e evasão escolar e a Portaria nº 248/2024/GS/SEDUC/MT que institui o Programa “Nenhum Estudante a Menos.';
                    document.getElementById("W0135vGRIDGEDMATDISCAVAFLTJUST_0001").value = parseInt(qtdeFaltas);
                    

                    console.log("hitar conf");

                    realConfirm=window.confirm;
                    window.confirm=function(){
                        window.confirm=realConfirm;
                        return true;
                    };

                    (function (){
                        document.getElementsByClassName("btnConfirmar")[0].click();
                    })();


                }

            }





            }


            await sleep(500);

            // -----------------------------------------------------------------

            // Segunda pausa aguardando que o elemento gx_ajax_notification esteja oculto
            while (!isNotificationHidden()) {
                //console.log("Segunda pausa - Aguardando ocultar...");
                await sleep(1000); // Pausa por 2 segundos antes de avançar para a próxima iteração
            }
            //console.log("Segunda pausa - Elemento gx_ajax_notification está oculto.");

             // Executa as ações após a segunda pausa -----------------------



            // -----------------------------------------------------------------
        }
        output.push(["total de faltas no bimestre:",
                            "",
                            "",
                            totalFaltas+" faltas justificadas",
                            ""]);
        //console.log("Fim do loop");
        arrayToHtmlTable(output);
    }


})();
