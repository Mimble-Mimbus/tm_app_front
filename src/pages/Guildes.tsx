import { IonPage } from "@ionic/react"
import { FC } from "react"


const Guildes: FC = () => {
  return (<IonPage>
    <div className="tuile-duo">
	<div className="tuile-container" id="tuile1" >
		<input type="checkbox" id="tuile-1" className="tuile-checkbox">
		</input>
		<label className="tuile-inner" htmlFor="tuile-1">
			<div className="tuile-recto">
				<img src="https://imgs.search.brave.com/sr5pmLgharwZW2e0mgJ1hQwZQFAOtsrOingLaxvTa34/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjIx/NDQ2OTc4OS9mci9w/aG90by9zY2lucXVl/LWNyb2NvZGlsZS1h/dXgteWV1eC1yb3Vn/ZXMuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPWlHSGEzUWRJ/VHAxb2xXbDhueU15/T2N0alJ3MDZYSkVT/N2hoekZJRXVjdkU9" alt="Image de la tuile">
				</img>
				<p>
					Pas de crainte, nous sommes là
				</p>
			</div>
			<div className="tuile-verso" id="verso-astrange">
				<p>
					Impulsifs et passionnés, ils sont les élus de toutes les prophéties, protégeront et étendront leur influence à tous les univers !</p>
			</div>
		</label>
	</div>
	<div className="tuile-container">
		<input type="checkbox" id="tuile-2" className="tuile-checkbox">
		</input>
		<label className="tuile-inner" htmlFor="tuile-2">
			<div className="tuile-recto">
				<img src="https://imgs.search.brave.com/sr5pmLgharwZW2e0mgJ1hQwZQFAOtsrOingLaxvTa34/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjIx/NDQ2OTc4OS9mci9w/aG90by9zY2lucXVl/LWNyb2NvZGlsZS1h/dXgteWV1eC1yb3Vn/ZXMuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPWlHSGEzUWRJ/VHAxb2xXbDhueU15/T2N0alJ3MDZYSkVT/N2hoekZJRXVjdkU9" alt="Image de la tuile">
				</img>
				<p>
					Le savoir, toujours !
				</p>
			</div>
			<div className="tuile-verso" id="verso-luxdor">
				<p>
					Érudits et inventeurs à l’esprit vif faisant face aux dangers grâce à leur intelligence et leur créativité. 
				</p>
			</div>
		</label>
	</div>
</div>
<div className="tuile-duo">
	<div className="tuile-container">
		<input type="checkbox" id="tuile-3" className="tuile-checkbox">
		</input>
		<label className="tuile-inner" htmlFor="tuile-3">
			<div className="tuile-recto">
				<img src="https://imgs.search.brave.com/sr5pmLgharwZW2e0mgJ1hQwZQFAOtsrOingLaxvTa34/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjIx/NDQ2OTc4OS9mci9w/aG90by9zY2lucXVl/LWNyb2NvZGlsZS1h/dXgteWV1eC1yb3Vn/ZXMuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPWlHSGEzUWRJ/VHAxb2xXbDhueU15/T2N0alJ3MDZYSkVT/N2hoekZJRXVjdkU9" alt="Image de la tuile">
				</img>
				<p>
					Un pas après l'autre !
				</p>
			</div>
			<div className="tuile-verso" id="verso-ro">
				<p>
					Justiciers à leurs heures perdues, ils sont les modèles de camaraderie et de résilience. Pour eux, le mot “impossible” n’existe pas
				</p>
			</div>
		</label>
	</div>
	<div className="tuile-container">
		<input type="checkbox" id="tuile-4" className="tuile-checkbox">
		</input>
		<label className="tuile-inner" htmlFor="tuile-4">
			<div className="tuile-recto">
				<img src="https://imgs.search.brave.com/sr5pmLgharwZW2e0mgJ1hQwZQFAOtsrOingLaxvTa34/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjIx/NDQ2OTc4OS9mci9w/aG90by9zY2lucXVl/LWNyb2NvZGlsZS1h/dXgteWV1eC1yb3Vn/ZXMuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPWlHSGEzUWRJ/VHAxb2xXbDhueU15/T2N0alJ3MDZYSkVT/N2hoekZJRXVjdkU9" alt="Image de la tuile">
				</img>
				<p>
					Rétablissons l'équilibre !
				</p>
			</div>
			<div className="tuile-verso" id="verso-xym">
				<p>
					Proches de la nature et justes, ses membres souhaitent rétablir l’équilibre du monde là où il a été chamboulé.
				</p>
			</div>
		</label>
	</div>
</div>
<div align="center" width="100%" margin="5%"> <a href="https://mimble-mimbus.fr/tm-festival/">Réalise le test !</a></div>
  </IonPage>)
}

export default Guildes
