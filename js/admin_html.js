let createProductHTML = `
<div class="form-row" id="upload-fields">
<div class="form-group col-md-2">
        <input type="text" class="form-control" id="inputID">
        <small class="form-text text-muted">hatszámjegyű cikkszám</small>
</div>

<div class="form-group col-md-8">
    
    <input placeholder="Megnevezés" type="text" class="form-control" id="inputName">
    <small class="form-text text-muted">minimum 3 karakter</small>
</div>
<div class="form-group col-md-2">

<div class="input-group">
<div class="input-group-prepend">
<label class="input-group-text" for="inputNumberOfImages">Képek</label>
</div>
<select class="custom-select" id="inputNumberOfImages">
<option value="0">0</option>
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5">5</option>
</select>
</div>

<small class="form-text text-muted">extra képek száma</small>
    
</div>
</div>
<div class="form-row">
<div class="form-group col-md-2">

    <input placeholder="Ár" type="text" class="form-control" id="inputPrice">
    <small class="form-text text-muted">csak számjegyek</small>
</div>

<div class="form-group col-md-10">

    <input placeholder="Mottó" type="text" class="form-control" id="inputMotto">
    <small class="form-text text-muted">(nem kötelező)</small>
</div>
</div>
<div class="form-group">

<textarea placeholder="Leírás" class="form-control text-justify" id="inputDescription"
    rows="8"></textarea>
    <small class="form-text text-muted">minimum 50 karakter: <span id="charCount"></span></small>
</div>
<button id="uploadButton" onclick="startUpload()" class="btn btn-block btn-success">TERMÉK RÖGZÍTÉSE</button>`

