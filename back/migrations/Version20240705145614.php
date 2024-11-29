<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240705145614 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE log DROP CONSTRAINT fk_8f3f68c5e04e49df');
        $this->addSql('DROP INDEX idx_8f3f68c5e04e49df');
        $this->addSql('ALTER TABLE log RENAME COLUMN scenario_id TO id_scenario');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE log RENAME COLUMN id_scenario TO scenario_id');
        $this->addSql('ALTER TABLE log ADD CONSTRAINT fk_8f3f68c5e04e49df FOREIGN KEY (scenario_id) REFERENCES scenario (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_8f3f68c5e04e49df ON log (scenario_id)');
    }
}
