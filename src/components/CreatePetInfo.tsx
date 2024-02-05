import "../css/createPetInfo.css";

export default function CreatePetInfo() {
  return (
    <div className="main-container">
      <div className="darkmode-false">
        <div className="heading">
          <span className="general-information">General Information:</span>
        </div>
        <div className="text-field">
          <span className="name-of-the-pet">Name of the Pet</span>
          <div className="input-group">
            <div className="input">
              <div className="placeholder" />
            </div>
          </div>
        </div>
        <div className="text-field-1">
          <span className="type-of-the-pet">Type of the Pet</span>
          <div className="input-group-2">
            <div className="input-3">
              <span className="placeholder-4">e.g. Dog</span>
            </div>
          </div>
        </div>
        <div className="text-field-5">
          <span className="breed-species-of-the-pet">
            Breed/species of the Pet
          </span>
          <div className="input-group-6">
            <div className="input-7">
              <span className="placeholder-8">e.g. Siberian Husky</span>
            </div>
            <input className="input-9" />
          </div>
        </div>
        <div className="text-field-a">
          <span className="age-of-the-pet">Age of the Pet</span>
          <div className="input-group-b">
            <div className="input-c">
              <span className="placeholder-d">e.g. 3 months</span>
            </div>
            <input className="input-e" />
          </div>
        </div>
        <div className="text-field-f">
          <span className="label">Weight of the Pet (kg)</span>
          <div className="input-group-10">
            <div className="input-11">
              <span className="placeholder-12">e.g. 15.1</span>
            </div>
            <input className="input-13" />
          </div>
        </div>
        <div className="select-field">
          <span className="label-14">Sex of the Pet</span>
          <div className="input-group-15">
            <div className="input-16">
              <span className="placeholder-17">-</span>
              <div className="icon" />
            </div>
            <input className="input-18" />
          </div>
        </div>
        <div className="heading-19">
          <span className="label-1a">Health:</span>
        </div>
        <div className="select-field-1b">
          <span className="label-1c">Spaying/Neutering</span>
          <div className="input-group-1d">
            <div className="input-1e">
              <span className="placeholder-1f">-</span>
              <div className="icon-20" />
            </div>
            <input className="input-21" />
          </div>
        </div>
        <div className="text-field-22">
          <span className="label-23">Health Status</span>
          <button className="button">
            <div className="input-24">
              <span className="placeholder-25">
                e.g. Any known health issues or signs of previous injuries
              </span>
            </div>
          </button>
        </div>
        <div className="text-field-26">
          <span className="label-27">Allergies</span>
          <div className="input-group-28">
            <div className="input-29">
              <span className="placeholder-2a">e.g. Allergies</span>
            </div>
            <input className="input-2b" />
          </div>
        </div>
        <div className="text-area-field">
          <span className="label-2c">Detailed Information</span>
          <div className="input-group-2d">
            <div className="input-2e">
              <span className="placeholder-2f">
                Provide comprehensive yet relevant information that gives
                potential adopters a clear picture of the pet's personality,
                needs, and history. You could include personality overview,
                daily routine, how the pet interaction with humans and animals,
                any commands or training the pet has received, favorite
                activities and toys, a brief background of the pet,
                adaptability, and any additional needs.
              </span>
            </div>
          </div>
        </div>
        <div className="group">
          <div className="group-30">
            <div className="vector" />
            <span className="images">Images</span>
          </div>
          <div className="rectangle" />
        </div>
        <button className="button-31">
          <span className="label-32">Send message</span>
        </button>
      </div>

      <div className="dark-mode">
        <div className="heading-33">
          <span className="label-34">General Information:</span>
        </div>
        <div className="text-field-35">
          <span className="label-36">Name of the Pet</span>
          <div className="input-group-37">
            <div className="input-38">
              <span className="placeholder-39">e.g. John</span>
            </div>
          </div>
        </div>
        <div className="text-field-3a">
          <span className="label-3b">Type of the Pet</span>
          <div className="input-group-3c">
            <div className="input-3d">
              <span className="placeholder-text">e.g. Dog</span>
            </div>
          </div>
        </div>
        <div className="text-field-3e">
          <span className="label-text">Breed/species of the Pet</span>
          <div className="input-group-3f">
            <div className="input-40">
              <span className="placeholder-text-41">e.g. Siberian Husky</span>
            </div>
          </div>
        </div>
        <div className="text-field-42">
          <span className="label-text-43">Age of the Pet</span>
          <div className="input-group-44">
            <div className="input-45">
              <span className="placeholder-text-46">e.g. 3 months</span>
            </div>
          </div>
        </div>
        <div className="text-field-47">
          <span className="label-text-48">Weight of the Pet (kg)</span>
          <div className="input-group-49">
            <div className="input-4a">
              <span className="placeholder-text-4b">e.g. 15.1</span>
            </div>
          </div>
        </div>
        <div className="select-field-4c">
          <span className="label-text-4d">Sex of the Pet</span>
          <div className="input-group-4e">
            <div className="input-4f">
              <span className="placeholder-text-50">-</span>
              <div className="lock-icon" />
            </div>
          </div>
        </div>
        <div className="heading-51">
          <span className="label-text-52">Health:</span>
        </div>
        <div className="select-field-53">
          <span className="spaying-neutering">Spaying/Neutering</span>
          <div className="input-group-54">
            <div className="input-55">
              <span className="placeholder-56">-</span>
              <div className="lock-icon-57" />
            </div>
          </div>
        </div>
        <div className="text-field-58">
          <span className="health-status">Health Status</span>
          <button className="input-group-59">
            <div className="input-5a">
              <span className="placeholder-5b">
                e.g. Any known health issues or signs of previous injuries
              </span>
            </div>
          </button>
        </div>
        <div className="text-field-5c">
          <span className="allergies">Allergies</span>
          <button className="input-group-5d">
            <div className="input-5e">
              <span className="placeholder-5f">e.g. Allergies</span>
            </div>
          </button>
        </div>
        <div className="text-area-field-60">
          <span className="detailed-information">Detailed Information</span>
          <div className="input-group-61">
            <div className="input-62">
              <span className="placeholder-63">
                Provide comprehensive yet relevant information that gives
                potential adopters a clear picture of the pet's personality,
                needs, and history. You could include personality overview,
                daily routine, how the pet interaction with humans and animals,
                any commands or training the pet has received, favorite
                activities and toys, a brief background of the pet,
                adaptability, and any additional needs.
              </span>
            </div>
          </div>
        </div>
        <div className="group-64">
          <div className="group-65">
            <div className="vector-66" />
            <span className="images-67">Images</span>
          </div>
          <div className="rectangle-68" />
        </div>
        <button className="button-69">
          <span className="send-message">Send message</span>
        </button>
      </div>
    </div>
  );
}
