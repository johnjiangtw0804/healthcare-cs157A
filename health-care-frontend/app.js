$(document).ready(function() {
  var $app = $('#app');
  var $title = $('<h1>Patient Dashboard</h1>');
  var $feed = $('<div class="feed"></div>');
  var $form = $('<form id="form">Patient ID: </form>');
  var $input = $('<input type="text" id="patientID" value="1">');
  var $button = $('<button id="update-feed">Enter</button>');

  $title.appendTo($app);
  $feed.appendTo($app);
  $form.appendTo($title);
  $input.appendTo($form);
  $button.appendTo($title);

  var id = document.getElementById("patientID").value;

  $button.on('click', function(event) {
    // console.log(document.getElementById("patientID").value)
    id = document.getElementById("patientID").value;
    logJSONData(id);
  });

  async function logJSONData(id) {
    var url = 'http://localhost:5500/api/dashboard/patient?patient_id=' + id;
    const response = await fetch(url);
    const patient = await response.json();
    renderFeed(patient);
  }

  var renderFeed = function(patient) {
    $feed.html('');
    // patient's info
    var $patientInfo = $('<div class="patientInfo">PATIENT INFO</div>');
    $patientInfo.append($('<div class="patientID"></div>').text('Patient ID: ' + patient.patient_id));
    $patientInfo.append($('<div class="firstname"> firstname</div>').text('First Name: ' + patient.first_name));
    $patientInfo.append($('<div class="lastname"> lastname</div>').text('Last Name: ' + patient.last_name));
    $patientInfo.append($('<div class="age"> age</div>').text('Age: ' + patient.age));
    $patientInfo.append($('<div class="sex"> sex</div>').text('Sex: ' + patient.sex));
    $patientInfo.append($('<div class="bloodtype"> bloodtype</div>').text('Bloodtype: ' + patient.blood_type));
    $patientInfo.append($('<div class="data_of_birth"> data_of_birth</div>').text('Date Of Birth: ' + patient.dob.slice(0, 10)));

    // vital signs
    var $vitalSign = $('<div class="vitalSign"> VITAL SIGN</div>');
    $vitalSign.append($('<div class="bodyTemperature"> bodyTemperature</div>').text('Body Temparature: ' + patient.body_temperature));
    $vitalSign.append($('<div class="pulseRate"> pulseRate</div>').text('Pulse Rate: ' + patient.pulse_rate));
    $vitalSign.append($('<div class="respirationRate"> respirationRate</div>').text('Respiration Rate: ' + patient.respiration_rate));  // always 0
    $vitalSign.append($('<div class="systolic_pressure"> systolic_presure</div>').text('Systolic Pressure: ' + patient.systolic_pressure));
    $vitalSign.append($('<div class="diastolic_pressure"> diastolic_pressure</div>').text('Diastolic Pressure: ' + patient.diastolic_pressure));

    // other
    var $other = $('<div class="other">OTHER</div>');
    $other.append($('<div class="prescribedMedication"> prescribedMedication</div>').text('Prescribed Medication: ' + arrayToString(patient.current_prescribed_meds)));
    $other.append($('<div class="assigned_doctor"> assigned_doctor</div>').text('Assigned Doctor: ' + patient.assigned_doctor_first_name + ' ' + patient.assigned_doctor_last_name));
    $other.append($('<div class="current_disease"> current_disease</div>').text('Current Disease: ' + arrayToString(patient.current_diseases)));

    $patientInfo.appendTo($feed);
    $vitalSign.appendTo($feed);
    $other.appendTo($feed);
  };

  var arrayToString = function(array) {
    var string = $.map(array, function(i){
      return i.name;
    }).join(', ');
    return string
  }
  logJSONData(id)
});