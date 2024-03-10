$(document).ready(function() {
  var $app = $('#app');
  var $title = $('<h1>Doctor Dashboard</h1>');
  var $doctorFeed = $('<div class="doctorFeed"></div>');
  var $feed = $('<div class="feed"></div>');
  var $form = $('<form id="form">Doctor ID: </form>');
  var $input = $('<input type="text" id="doctorID" value="1">');
  var $button = $('<button id="update-feed">Enter</button>');

  $title.appendTo($app);
  $doctorFeed.appendTo($app);
  $feed.appendTo($app);
  $form.appendTo($title);
  $input.appendTo($form);
  $button.appendTo($title);

  // get default value
  var id = document.getElementById("doctorID").value;

  $button.on('click', function(event) {
    id = document.getElementById("doctorID").value;
    logJSONData(id);
  });

  async function logJSONData(id) {
    var url = 'http://localhost:5500/api/dashboard/doctor?doctor_id=' + id;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(patient.patient_id);
    renderDoctorInfo(data);
    renderFeed(data);
  }
  var renderDoctorInfo = function(data) {
    $doctorFeed.html('');
    doctor = data.patients[0]
    $doctorFeed.append($('<div class="doctorId"></div>').text('Doctor ID: ' + doctor.assigned_doctor_id));
    $doctorFeed.append($('<div class="doctorFirstname"></div>').text('First Name: ' + doctor.assigned_doctor_first_name));
    $doctorFeed.append($('<div class="doctorLastname"></div>').text('Last Name: ' + doctor.assigned_doctor_last_name));
  }

  var renderFeed = function(data) {
    $feed.html('');
    patients = data.patients;
    patient = patients[i]
    for (var i = 0; i < patients.length; i++) {
      var patient = patients[i]
      var $perPatient = $('<div class="perPatient"></div>');

      // patient's info
      var $patientInfo = $('<div class="patientInfo"></div>');
      $patientInfo.append($('<div class="patientID"></div>').text('Patient ID: ' + patient.patient_id));
      $patientInfo.append($('<div class="firstname"> firstname</div>').text('First Name: ' + patient.first_name));
      $patientInfo.append($('<div class="lastname"> lastname</div>').text('Last Name: ' + patient.last_name));
      $patientInfo.append($('<div class="age"> age</div>').text('Age: ' + patient.age));
      $patientInfo.append($('<div class="sex"> sex</div>').text('Sex: ' + patient.sex));
      $patientInfo.append($('<div class="bloodtype"> bloodtype</div>').text('Bloodtype: ' + patient.blood_type));  // no A+
      $patientInfo.append($('<div class="data_of_birth"> data_of_birth</div>').text('Date Of Birth: ' + patient.dob.slice(0, 10)));

      // vital signs
      var $vitalSign = $('<div class="vitalSign"></div>');
      $vitalSign.append($('<div class="bodyTemperature"> bodyTemperature</div>').text('Body Temparature: ' + patient.body_temperature));
      $vitalSign.append($('<div class="pulseRate"> pulseRate</div>').text('Pulse Rate: ' + patient.pulse_rate));
      $vitalSign.append($('<div class="respirationRate"> respirationRate</div>').text('Respiration Rate: ' + patient.respiration_rate));  // always 0
      $vitalSign.append($('<div class="systolic_pressure"> systolic_presure</div>').text('Systolic Pressure: ' + patient.systolic_pressure));
      $vitalSign.append($('<div class="diastolic_pressure"> diastolic_pressure</div>').text('Diastolic Pressure: ' + patient.diastolic_pressure));

      // other
      var $other = $('<div class="other"></div>');
      $other.append($('<div class="prescribedMedication"> prescribedMedication</div>').text('Prescribed Medication: ' + arrayToString(patient.current_prescribed_meds)));
      // $other.append($('<div class="assigned_doctor"> assigned_doctor</div>').text('Assigned Doctor: ' + patient.assigned_doctor_first_name + ' ' + patient.assigned_doctor_last_name));
      $other.append($('<div class="current_disease"> current_disease</div>').text('Current Disease: ' + arrayToString(patient.current_diseases)));

      $perPatient.appendTo($feed);
      $patientInfo.appendTo($perPatient);
      $vitalSign.appendTo($perPatient);
      $other.appendTo($perPatient);
    };
  };

  var arrayToString = function(array) {
    var string = $.map(array, function(i){
      return i.name;
    }).join(', ');
    return string
  }
  logJSONData(id)



});