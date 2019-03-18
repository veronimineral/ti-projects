<?php
class db_mongo {
	private $user = "6schabowicz" ;
	private $pass = "pass";
	private $host = "pascal.fis.agh.edu.pl";
	private $base = "6schabowicz";
	private $dataColl = "rekordy";
	private $userColl = "uzytkownicy";
	private $sessionColl = "sesje";
	private $recordCollection;
	private $userCollection;
	private $sessionCollection;
	private $conn;
	private $dbase;

	function __construct() {
		$this->conn = new Mongo("mongodb://{$this->user}:{$this->pass}@{$this->host}/{$this->base}");
		$this->dbase = $this->conn->selectDB($this->base);
		$this->recordCollection = $this->dbase->selectCollection($this->dataColl);
		$this->userCollection = $this->dbase->selectCollection($this->userColl);
		$this->sessionCollection = $this->dbase->selectCollection($this->sessionColl);
	}

	function select() {
		$cursor = $this->recordCollection->find();
		$table = iterator_to_array($cursor);
		return $table;
	}

	function insert($value)
	{
		$query = array('date' => $value['date'], 'time' => $value['time'], 'place' => $value['place'], 'pm10' => $value['pm10'], 'pm25' => $value['pm25'], 'pm1' => $value['pm1']);
		$cursor = $this->recordCollection->find($query);
		$ret = $this->recordCollection->insert($value);
		return $ret;
	}


	public function register($user) {
		$cursor =  $this->userCollection->find(array('login' => $user['login']));
		if($cursor->count() == 0)
			$ret = $this->userCollection->insert($user);
		else
			return false;
		return $ret;
	}

	public function login($array)
	{
		$login = $array['login'];
		$haslo = $array['haslo'];
		$cursor =  $this->userCollection->find(array('login' => $login, 'haslo' => $haslo));
		if($cursor->count() == 0)
			$ret = false;
		else
		{
			$sessionID = md5(uniqid($login, true));
			$start = date('Y-m-d H:i:s', time());
			$ret = $this->sessionCollection->insert(array('sessionID' => $sessionID, 'start' => $start));
		}
		return $sessionID;
	}

	public function logout($sessID)
	{
		$doc =  $this->sessionCollection->findOne(array('sessionID' => $sessID));
		if($doc != NULL)
		{
			$this->sessionCollection->remove(array('sessionID' => $sessID));
		}
		else
			return false;
		return true;
	}

	public function checkSession($array) {
		$doc =  $this->sessionCollection->findOne(array('sessionID' => $array['sessionID']));
		if($doc != NULL)
		{
			$start = $doc['start'];
			$date = DateTime::createFromFormat("Y-m-d H:i:s", $start);
			$now = new DateTime('now');
			$diff = $now->getTimestamp() - $date->getTimestamp();
			if($diff > (15*60))
			{
				$this->sessionCollection->remove(array('sessionID' => $array['sessionID']));
				return false;
			}
		}
		else
			return false;
		return true;
	}
}
