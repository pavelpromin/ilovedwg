String.prototype.substitute = function(o) {
    return this.replace(/{([^{}]*)}/g,
        function(a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

var template_paragraph_text = ' \
<div class="paragraph" id="{idx}">\
   <h3>{title}</h3> \
   <div class="bs-callout bs-callout-warning" style="margin-top:0"> \
      <p>{description}</p> \
   </div> \
</div> \
';

var template_paragraph_image = ' \
<div class="paragraph" id="{idx}">\
   <h3>{title}</h3> \
   <div class="bs-callout bs-callout-warning" style="margin-top:0"> \
      <p>{description}</p> \
      <div class="row"> \
         <div class="col-md-6" style="text-align:center;"> \
            <img class="thumbnail" src="example/{idx}/{idx}_true.png" alt="..."> \
            <span class="label label-success btnx"><span class="glyphicon glyphicon-ok"></span> Правильно</span> \
         </div> \
         <div class="col-md-6" style="text-align:center;"> \
            <img class="thumbnail" src="example/{idx}/{idx}_false.png" alt="..."> \
            <span class="false"></span> \
            <span class="label label-danger btnx"><span class="glyphicon glyphicon-remove"></span> Неправильно</span> \
         </div> \
      </div> \
   </div> \
</div> \
';

$.getJSON('data.json', function(data) {
   var subjects = [];
   var sidebar = [];
  $.each(data, function(key, val) {
    //console.log(key+"---"+val);
    //console.log(val["subject"]);
    sideli ='<li><a href="#'+key+'">'+val["subject"]+'</a></li>';
    sidebar.push(sideli);
    
    var output = ' \
      <div class="page-header"> \
         <h1 id="'+key+'">'+val["subject"]+'</h1> \
      </div>';
     $.each(val["paragraphs"],function(id, paragraph){
      if (paragraph["images"]!=true){
         template = template_paragraph_text;
      }
      else{
         template = template_paragraph_image;
      }
       console.log(paragraph);
       output += template.substitute(paragraph);
     });
     console.log(output);
    subjects.push(output);
  });
 
  $('<div/>', {
    'class': 'my-new-list',
    html: subjects.join('')
  }).appendTo('.bs-docs-section');
  
  $('<ul/>', {
    'class': 'nav bs-sidenav',
    html: sidebar.join('')
  }).appendTo("[role='complementary']");
  
  
  $('div.paragraph > h3').removeClass('bs-callout bs-callout-warning');
  $('div.paragraph > h3').click(function () {
      $(this).toggleClass('bs-callout bs-callout-warning');
    });
  $('div.paragraph > h3').next().hide();
  
   $('div.paragraph > h3').click(function(){
      $(this).next().toggle();
   });
});







